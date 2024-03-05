// enemy.js
import Phaser from 'phaser';

export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, health) {
        super(scene, x, y, texture);
        this.health = health;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Crear la barra de vida del enemigo
        this.healthBar = this.scene.add.graphics();
        this.updateHealthBar();
    }

    getDamage(damage) {}

    // Método para actualizar la barra de vida del enemigo
    updateHealthBar() {
        if(this.health > 0 && this.health < 100){
            const barWidth = this.width/2; // Ancho de la barra de vida igual al ancho del enemigo
            const barHeight = 5; // Alto de la barra de vida
            const padding = -30; // Espacio entre la barra de vida y el enemigo
            const barX = this.x - barWidth / 2; // Posición horizontal de la barra de vida
            const barY = this.y - this.height / 2 - barHeight - padding; // Posición vertical de la barra de vida
            const healthPercentage = this.health / 100; // Porcentaje de vida actual del enemigo

            // Limpiar la barra de vida
            this.healthBar.clear();

            // Dibujar la barra de vida encima del enemigo
            this.healthBar.fillStyle(0xff0000); // Color rojo para la barra de vida
            this.healthBar.fillRect(barX, barY, barWidth * healthPercentage, barHeight);
        }
        else{
            this.healthBar.clear();
        }
    }
}
