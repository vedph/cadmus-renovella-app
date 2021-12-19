import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoeticTextsPartFeatureComponent } from './poetic-texts-part-feature.component';

describe('PoeticTextsPartFeatureComponent', () => {
  let component: PoeticTextsPartFeatureComponent;
  let fixture: ComponentFixture<PoeticTextsPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoeticTextsPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoeticTextsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
