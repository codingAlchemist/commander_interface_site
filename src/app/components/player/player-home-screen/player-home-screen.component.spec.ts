import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerHomeScreenComponent } from './player-home-screen.component';

describe('PlayerHomeScreenComponent', () => {
  let component: PlayerHomeScreenComponent;
  let fixture: ComponentFixture<PlayerHomeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerHomeScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerHomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
