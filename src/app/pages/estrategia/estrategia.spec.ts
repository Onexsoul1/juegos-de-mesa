import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstrategiaComponent } from './estrategia';

describe('Estrategia', () => {
  let component: EstrategiaComponent;
  let fixture: ComponentFixture<EstrategiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstrategiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstrategiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
