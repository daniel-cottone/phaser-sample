import * as Phaser from 'phaser';

import { GAME_CENTER } from '../constants';

export class HUD extends Phaser.Scene {
  constructor() {
    super('hud');
    this.initialTime = 60;
    this.reticle = null;
    this.score = null;
    this.timer = null;
    this.scoreText = null;
    this.timerText = null;
    this.gameOverText = null;
  }

  create(config) {
    this.score = 0;
    this.timer = this.initialTime;

    this.reticle = this.physics.add.sprite(...GAME_CENTER, 'reticle');
    this.reticle.setDisplaySize(50, 50)
      .setCollideWorldBounds(true);
    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, { fontSize: '24px', fill: '#000' });
    this.timerText = this.add.text(16, 40, `Time: ${this.timer}`, { fontSize: '24px', fill: '#000' });

    // Handle events
    this.createHandlers();
  }

  update(time, delta) {
    if (this.timer > 0) {
      const secondsElapsed = Math.floor(time / 1000);
      this.updateTimer(secondsElapsed);
    } else {
      this.gameOverText = this.add.text(450, GAME_CENTER[1], `Game Over`, { fontSize: '48px', fill: '#000' });
    }
  }

  createHandlers() {
    this.input.on('pointermove', function (pointer) {
      if (this.input.mouse.locked) {
        this.reticle.x += pointer.movementX;
        this.reticle.y += pointer.movementY;
      }
    }, this);
  }

  updateScore(score) {
    this.score = score
    this.scoreText.setText(`Score: ${this.score}`);
  }

  updateTimer(seconds) {
    this.timer = this.initialTime - seconds;
    this.timerText.setText(`Time: ${this.timer}`);
  }
}
