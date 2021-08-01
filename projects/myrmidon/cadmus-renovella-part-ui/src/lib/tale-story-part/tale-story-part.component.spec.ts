import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaleStoryPartComponent } from './tale-story-part.component';

describe('TaleStoryPartComponent', () => {
  let component: TaleStoryPartComponent;
  let fixture: ComponentFixture<TaleStoryPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaleStoryPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaleStoryPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
