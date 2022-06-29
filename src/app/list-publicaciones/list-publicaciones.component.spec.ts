import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPublicacionesComponent } from './list-publicaciones.component';

describe('ListPublicacionesComponent', () => {
  let component: ListPublicacionesComponent;
  let fixture: ComponentFixture<ListPublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPublicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
