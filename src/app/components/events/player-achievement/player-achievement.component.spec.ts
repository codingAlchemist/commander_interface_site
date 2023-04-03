import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAchievementComponent } from './player-achievement.component';

describe('PlayerAchievementComponent', () => {
  let component: PlayerAchievementComponent;
  let fixture: ComponentFixture<PlayerAchievementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerAchievementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
