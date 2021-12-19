import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoeticTextsPartComponent } from './poetic-texts-part.component';

describe('PoeticTextsPartComponent', () => {
  let component: PoeticTextsPartComponent;
  let fixture: ComponentFixture<PoeticTextsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoeticTextsPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoeticTextsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
