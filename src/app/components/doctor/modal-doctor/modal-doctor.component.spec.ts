import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDoctorComponent } from './modal-doctor.component';

describe('ModalDoctorComponent', () => {
  let component: ModalDoctorComponent;
  let fixture: ComponentFixture<ModalDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
