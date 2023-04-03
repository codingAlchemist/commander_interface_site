import { sandboxOf } from 'angular-playground';
import { PlayerHomeScreenComponent } from './player-home-screen.component';

export default sandboxOf(PlayerHomeScreenComponent)
  .add('default', {
    template: `<app-player-home-screen></app-player-home-screen>`
  });
