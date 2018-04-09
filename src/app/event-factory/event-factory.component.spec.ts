import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFactoryComponent } from './event-factory.component';

describe('EventFactoryComponent', () => {
  let component: EventFactoryComponent;
  let fixture: ComponentFixture<EventFactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventFactoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
