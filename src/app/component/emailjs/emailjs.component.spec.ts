import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailjsComponent } from './emailjs.component';

describe('EmailjsComponent', () => {
  let component: EmailjsComponent;
  let fixture: ComponentFixture<EmailjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailjsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
