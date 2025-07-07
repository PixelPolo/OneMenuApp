import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionJoin } from './session-join';

describe('SessionJoin', () => {
  let component: SessionJoin;
  let fixture: ComponentFixture<SessionJoin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionJoin],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionJoin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
