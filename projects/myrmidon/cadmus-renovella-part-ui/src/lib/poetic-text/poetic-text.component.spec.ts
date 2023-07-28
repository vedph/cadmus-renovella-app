import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoeticTextComponent } from './poetic-text.component';

describe('PoeticTextComponent', () => {
  let component: PoeticTextComponent;
  let fixture: ComponentFixture<PoeticTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoeticTextComponent]
    });
    fixture = TestBed.createComponent(PoeticTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
