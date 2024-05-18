// enemy.js
import Phaser from 'phaser';

export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, health, speed, jumpSpeed, fieldOfView, rangeAttack, attackSpeed, damage) {
        super(scene, x, y);
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.health = health;
        this.speed = speed;
        this.jumpSpeed = jumpSpeed;
        this.fieldOfView = fieldOfView;
        this.rangeAttack = rangeAttack;
        this.attackSpeed = attackSpeed;
        this.damage = damage;
        this.spawnX = x;
        this.spawnY = y;
        this.canAttack = true;
        this.canAnimate = true;
        // Crear la barra de vida del enemigo
        this.healthBar = this.scene.add.graphics();
        this.updateHealthBar();

        const config = {
            mute: false,
            volume: 0.10,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
        };
        this.spider_hit = this.scene.sound.add("spider_hit", config);
        this.beast_hit = this.scene.sound.add("beast_hit", config);
    }

    getDamage(damage) {}

    move() {
        // Verificar si el jugador está dentro del campo de visión del enemigo
        if ((this.x - this.fieldOfView < this.scene.player.x) && (this.scene.player.x < this.x + this.fieldOfView) && (this.y - this.fieldOfView < this.scene.player.y) && (this.scene.player.y < this.y + this.fieldOfView)) {
    
            // Verificar si hay una pared delante del enemigo
            if (this.scene.player.x < this.x - 25 && !this.isWallInFront(-20)) {
                // Mover hacia la izquierda si no hay pared
                this.body.setVelocityX(-this.speed);
                this.setFlipX(true);
            } else if (this.scene.player.x > this.x + 25 && !this.isWallInFront(50)) {
                // Mover hacia la derecha si no hay pared
                this.body.setVelocityX(this.speed);
                this.setFlipX(false);
            } else {
                // Quedarse quieto si hay una pared
                this.body.setVelocityX(0);
            }
        } else {
            // Quedarse quieto si el jugador está fuera del campo de visión
            this.body.setVelocityX(0);
        }
    }
    
    isWallInFront(offsetX) {
        // Calcula las coordenadas del punto en frente del enemigo
        const frontX = this.x + offsetX;
        const frontY = this.y; // Ajusta la altura según la posición de la hitbox del enemigo
    
        // Verifica si hay un tile en la capa de paredes en las coordenadas calculadas
        return this.scene.wallLayer.hasTileAtWorldXY(frontX, frontY);
    }

    // Método para actualizar la barra de vida del enemigo
    updateHealthBar() {
        if(this.health > 0){
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
