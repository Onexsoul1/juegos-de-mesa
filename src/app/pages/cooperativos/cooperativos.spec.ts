import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperativosComponent } from './cooperativos';

describe('Cooperativos', () => {
  let component: CooperativosComponent;
  let fixture: ComponentFixture<CooperativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CooperativosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CooperativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
