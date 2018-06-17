import * as Phaser from 'phaser';

export class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('background', 'assets/colored_talltrees.png');
    this.load.image('reticle', 'assets/crosshair174.png');
    this.load.image('pig', 'assets/animals/pig.png');
  }

  create(config) {
    this.scene.start('background');
  }
}
