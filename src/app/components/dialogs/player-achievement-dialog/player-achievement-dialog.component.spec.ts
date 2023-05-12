import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAchievementDialogComponent } from './player-achievement-dialog.component';

describe('PlayerAchievementDialogComponent', () => {
  let component: PlayerAchievementDialogComponent;
  let fixture: ComponentFixture<PlayerAchievementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerAchievementDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerAchievementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
