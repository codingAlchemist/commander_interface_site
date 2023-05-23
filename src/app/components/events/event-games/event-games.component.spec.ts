import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGamesComponent } from './event-games.component';

describe('EventGamesComponent', () => {
  let component: EventGamesComponent;
  let fixture: ComponentFixture<EventGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
