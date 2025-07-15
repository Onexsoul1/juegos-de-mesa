import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfantilesComponent } from './infantiles';

describe('Infantiles', () => {
  let component: InfantilesComponent;
  let fixture: ComponentFixture<InfantilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfantilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfantilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
