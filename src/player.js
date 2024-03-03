import Phaser from 'phaser'
import Enemy from './enemy.js';

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        this.health = 100;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setDisplaySize(180, 140);
        this.body.setSize(35, 52);
        this.body.setOffset(39, 20);
        this.setScale(1.9, 2);
        this.body.setCollideWorldBounds();
        this.speed = 300;
        this.jumpSpeed = -400;
        this.play('stand');

        // Crear la barra de vida como un objeto de gráfico
        this.healthBar = this.scene.add.graphics();
        this.updateHealthBar();

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.j = this.scene.input.keyboard.addKey('J');
    }

    updateHealthBar() {
        const barWidth = 200; // Ancho de la barra de vida
        const barHeight = 20; // Alto de la barra de vida
        const padding = 20; // Espacio entre la barra de vida y el borde de la pantalla
        const barX = padding; // Posición horizontal de la barra de vida
        const barY = padding; // Posición vertical de la barra de vida
        const healthPercentage = this.health / 100; // Porcentaje de vida actual
    
        // Limpiar el área del cuadrado de la barra de vida
        this.healthBar.clear();
    
        // Dibujar el fondo del cuadrado de la barra de vida (rectángulo negro)
        this.healthBar.fillStyle(0x000000); // Negro
        this.healthBar.fillRect(barX, barY, barWidth, barHeight);
    
        // Dibujar la barra de vida encima del fondo
        this.healthBar.fillStyle(0x00ff00); // Verde
        this.healthBar.fillRect(barX, barY, barWidth * healthPercentage, barHeight);
    }

    updateHealth() {
        this.updateHealthBar();
    }

    attackEnemy(player, enemy) {
        // Reducir la salud del enemigo
        enemy.reduceHealth(10); // Por ejemplo, reducir en 10 puntos
    }

    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        let isRunning = false;
        let isAttacking = false;
        
        if (Phaser.Input.Keyboard.JustDown(this.j) && !this.isAttacking) {
            this.isAttacking = true;
            this.play('attack1', true);
            this.on('animationcomplete-attack1', () => {
                this.isAttacking = false;
            });
            
        }
        
    

        if (this.cursors.up.isDown && this.body.onFloor()) {
            this.body.setVelocityY(this.jumpSpeed);
            isRunning = true;
        }
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-this.speed);
            this.setFlipX(true);
            isRunning = true;
        }
        else if (this.cursors.right.isDown) {
            this.body.setVelocityX(this.speed);
            this.setFlipX(false);
            isRunning = true;
        }
        else {
            this.body.setVelocityX(0);
            isRunning = false;
        }
        
        if (this.health <= 0) {
            // Si la vida llega a 0, el jugador muere
            // Aquí puedes implementar lógica adicional, como reiniciar el juego, mostrar un mensaje de game over, etc.
            console.log("Game Over");
        } else {
            if (!this.isAttacking && !this.body.onFloor()) {
                this.play('jump', true);
            } else if (!this.isAttacking && isRunning && this.body.onFloor()) {
                this.play('run', true); 
            } else if (!this.isAttacking) {
                this.play('stand', true);
            }
        }
        
        this.updateHealthBar();
    }

}
