import * as Phaser from 'phaser';

import { GAME_WIDTH, GAME_HEIGHT, GAME_ORIGINS } from '../constants';

export class Birds extends Phaser.Scene {
  constructor() {
    super('birds');
    this.birds = null;
    this.minimumHeight = GAME_HEIGHT / 2;
    this.maxBirds = 3;
    this.hud = null;
  }

  create(config) {
    this.birds = this.physics.add.group();
    this.hud = this.scene.get('hud');
    this.createHandlers();
  }

  update(time, delta) {
    this.pruneOffScreenBirds();

    if (this.birds.children.size < this.maxBirds) {
      this.createBird();
    }

    if (this.hud.timer <= 0) {
      this.stop();
    }
  }

  createBird() {
    const xBounds = [ GAME_ORIGINS[0], GAME_WIDTH ];
    const xIndex = Math.floor(Math.random() * 2);
    const x = xBounds[xIndex];
    const y = Math.floor(Math.random() * (this.minimumHeight)) + 20;
    const velocityX = Math.floor(Math.random() * 200) + 50;

    this.birds.create(x, y, 'pig')
      .setDisplaySize(50, 50)
      .setVelocityX((x === GAME_WIDTH) ? velocityX * -1 : velocityX);
  }

  createHandlers() {
    this.input.on('pointerup', function () {
      for (let bird of this.birds.getChildren()) {
        const { left, right, top, bottom } = bird.body;
        const { x, y } = this.hud.reticle;
        if (x <= right && x >= left && y <= bottom && y >= top) {
          this.killBird(bird);
        }
      }
    }, this);
  }

  pruneOffScreenBirds() {
    for (let bird of this.birds.getChildren()) {
      const { x, y } = bird;
      if (x > GAME_WIDTH || x < GAME_ORIGINS[0] || y > GAME_HEIGHT || y < GAME_ORIGINS[1]) {
        this.birds.remove(bird, true, true);
      }
    }
  }

  killBird(bird) {
    this.hud.updateScore(this.hud.score + 10);
    this.birds.remove(bird, true, true);
  }

  stop() {
    this.birds.destroy(true);
    this.scene.pause();
  }
}
