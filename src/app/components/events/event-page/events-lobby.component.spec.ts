import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsLobbyComponent } from './events-lobby.component';

describe('EventsLobbyComponent', () => {
  let component: EventsLobbyComponent;
  let fixture: ComponentFixture<EventsLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsLobbyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
