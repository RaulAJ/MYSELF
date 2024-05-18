// enemy.js
import Phaser from 'phaser';

export default class restZone extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'rest_zone');
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
        this.setScale(1.75, 1.75);
    }

   

}
