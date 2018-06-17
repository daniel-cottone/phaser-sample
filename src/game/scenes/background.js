import * as Phaser from 'phaser';

import { GAME_BOUNDS, GAME_CENTER, GAME_ORIGINS } from '../constants';

export class Background extends Phaser.Scene {
  constructor() {
    super('background');
    this.background = null;
  }

  create(config) {
    this.physics.world.setBounds(...GAME_ORIGINS, ...GAME_BOUNDS);
    this.background = this.add.image(...GAME_CENTER, 'background');
    this.background.setDisplaySize(...GAME_BOUNDS);
    this.scene.launch('hud');
    this.scene.launch('birds');
    this.scene.bringToTop('hud');
  }
}
