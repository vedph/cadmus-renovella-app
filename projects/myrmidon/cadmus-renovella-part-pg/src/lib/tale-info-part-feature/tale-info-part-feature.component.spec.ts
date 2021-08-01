import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaleInfoPartFeatureComponent } from './tale-info-part-feature.component';

describe('TaleInfoPartFeatureComponent', () => {
  let component: TaleInfoPartFeatureComponent;
  let fixture: ComponentFixture<TaleInfoPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaleInfoPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaleInfoPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
