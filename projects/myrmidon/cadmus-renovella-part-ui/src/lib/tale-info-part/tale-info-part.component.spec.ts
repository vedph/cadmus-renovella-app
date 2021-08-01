import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaleInfoPartComponent } from './tale-info-part.component';

describe('TaleInfoPartComponent', () => {
  let component: TaleInfoPartComponent;
  let fixture: ComponentFixture<TaleInfoPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaleInfoPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaleInfoPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
