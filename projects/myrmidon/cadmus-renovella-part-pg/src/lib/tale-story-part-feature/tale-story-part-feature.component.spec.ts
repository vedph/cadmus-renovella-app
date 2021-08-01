import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaleStoryPartFeatureComponent } from './tale-story-part-feature.component';

describe('TaleStoryPartFeatureComponent', () => {
  let component: TaleStoryPartFeatureComponent;
  let fixture: ComponentFixture<TaleStoryPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaleStoryPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaleStoryPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
