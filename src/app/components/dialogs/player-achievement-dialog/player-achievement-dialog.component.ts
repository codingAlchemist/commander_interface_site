import { Component, Input, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-player-achievement-dialog',
  templateUrl: './player-achievement-dialog.component.html',
  styleUrls: ['./player-achievement-dialog.component.scss'],
})
export class PlayerAchievementDialogComponent implements OnInit {
  @Inject(MAT_DIALOG_DATA) player: Player;
  constructor(
    private dialogRef: MatDialogRef<PlayerAchievementDialogComponent>
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }
}
