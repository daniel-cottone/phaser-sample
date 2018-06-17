import * as Phaser from 'phaser';

import { GAME_WIDTH, GAME_HEIGHT } from './constants';
import * as Scenes from './scenes';

function postBoot(game) {
  // Locks pointer on mousedown
  game.canvas.addEventListener('mousedown', function () {
      game.input.mouse.requestPointerLock();
  });
}

const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      //debug: true
    }
  },
  scene: [ Scenes.Preloader, Scenes.Background, Scenes.Birds, Scenes.HUD ],
  callbacks: { postBoot }
};

export default config;
