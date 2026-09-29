import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy,
  signal,
  inject,
  computed,
} from '@angular/core';
import { Thesaurus, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { AppRepository } from '@myrmidon/cadmus-state';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { take } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ThemeToggleComponent } from '@myrmidon/ngx-mat-tools';
import {
  AuthJwtService,
  GravatarPipe,
  User,
} from '@myrmidon/auth-jwt-login';
import { EnvService, RamStorageService } from '@myrmidon/ngx-tools';

import { ViafRefLookupService } from '@myrmidon/cadmus-refs-viaf-lookup';
import { LOOKUP_CONFIGS_KEY } from '@myrmidon/cadmus-refs-lookup';
import { DbpediaRefLookupService } from '@myrmidon/cadmus-refs-dbpedia-lookup';
import { GeoNamesRefLookupService } from '@myrmidon/cadmus-refs-geonames-lookup';
import { RefLookupConfig } from '@myrmidon/cadmus-refs-lookup';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    RouterOutlet,
    MatButtonModule,
    MatDivider,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    GravatarPipe,
    ThemeToggleComponent,
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly _subs: Subscription[] = [];
  private readonly _bo = inject(BreakpointObserver);
  public readonly isMobile = signal<boolean>(false);
  public readonly logged = signal<boolean>(false);

  public readonly user = signal<User | undefined>(undefined);
  public readonly itemBrowsers = signal<ThesaurusEntry[] | undefined>(
    undefined,
  );
  public version = signal<string>('');

  readonly branding = computed(() => {
    switch (this._env.get('branding')) {
      case 'staging':
        return {
          bg: 'var(--mat-sys-tertiary)',
          text: 'var(--mat-sys-on-tertiary)',
        };
      case 'dev':
        return {
          bg: 'var(--mat-sys-error)',
          text: 'var(--mat-sys-on-error)',
        };
      default: // Production
        return {
          bg: 'var(--mat-sys-primary)',
          text: 'var(--mat-sys-on-primary)',
        };
    }
  });

  constructor(
    @Inject('itemBrowserKeys')
    private _itemBrowserKeys: { [key: string]: string },
    private _authService: AuthJwtService,
    private _appRepository: AppRepository,
    private _router: Router,
    private _env: EnvService,
    storage: RamStorageService,
    viaf: ViafRefLookupService,
    dbpedia: DbpediaRefLookupService,
    geonames: GeoNamesRefLookupService,
  ) {
    this.version.set(this._env.get('version') || '');

    this._bo
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((res) => this.isMobile.set(res.matches));

    // configure external lookup for asserted composite IDs
    storage.store(LOOKUP_CONFIGS_KEY, [
      {
        name: 'VIAF',
        iconUrl: '/img/viaf128.png',
        description: 'Virtual International Authority File',
        label: 'ID',
        service: viaf,
        itemIdGetter: (item: any) => item?.viafid,
        itemLabelGetter: (item: any) => item?.displayForm,
      },
      {
        name: 'DBpedia',
        iconUrl: '/img/dbpedia128.png',
        description: 'DBpedia',
        label: 'ID',
        service: dbpedia,
        itemIdGetter: (item: any) => item?.uri,
        itemLabelGetter: (item: any) => item?.label,
      },
      {
        name: 'geonames',
        iconUrl: '/img/geonames128.png',
        description: 'GeoNames',
        label: 'ID',
        service: geonames,
        itemIdGetter: (item: any) => item?.geonameId,
        itemLabelGetter: (item: any) => item?.toponymName,
      },
    ] as RefLookupConfig[]);
  }

  public ngOnInit(): void {
    this.user.set(this._authService.currentUserValue || undefined);
    this.logged.set(this.user() !== null);

    // when the user logs in or out, reload the app data
    this._subs.push(
      this._authService.currentUser$.subscribe((user: User | null) => {
        this.logged.set(this._authService.isAuthenticated(true));
        this.user.set(user || undefined);
        if (user) {
          console.log('User logged in: ', user);
          this._appRepository.load();
        } else {
          console.log('User logged out');
        }
      }),
    );

    // when the thesaurus is loaded, get the item browsers
    this._subs.push(
      this._appRepository.itemBrowserThesaurus$.subscribe(
        (thesaurus: Thesaurus | undefined) => {
          this.itemBrowsers.set(thesaurus ? thesaurus.entries : undefined);
        },
      ),
    );
  }

  public ngOnDestroy(): void {
    this._subs.forEach((s) => s.unsubscribe());
  }

  public getItemBrowserRoute(id: string): string {
    return this._itemBrowserKeys[id] || id;
  }

  public logout(): void {
    if (!this.logged()) {
      return;
    }
    this._authService
      .logout()
      .pipe(take(1))
      .subscribe((_) => {
        this._router.navigate(['/home']);
      });
  }
}
