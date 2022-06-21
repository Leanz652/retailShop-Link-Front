import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPublicacionesComponent } from './mis-publicaciones.component';

describe('MisPublicacionesComponent', () => {
  let component: MisPublicacionesComponent;
  let fixture: ComponentFixture<MisPublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisPublicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
