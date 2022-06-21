import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarVentaComponent } from './publicar-venta.component';

describe('PublicarVentaComponent', () => {
  let component: PublicarVentaComponent;
  let fixture: ComponentFixture<PublicarVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicarVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
