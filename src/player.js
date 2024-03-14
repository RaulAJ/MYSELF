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
        this.attackCount = 0;
        this.health = 100;
        this.level_melee = 1;
        this.level_distance = 1;
        this.enemies_melee = 0;
        this.enemies_distance = 0;

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

        
        /*this.weaponDamage = this.scene.add.zone(100, 40, 110, 80);
        this.scene.physics.add.existing(this.weaponDamage);
        this.weaponDamage.body.setAllowGravity(false);

        this.add(this.weaponDamage); */


        this.healthbar = this.scene.add.sprite(185, 52, 'healthbar');
        this.healthbar.setScale(0.60);
        this.healthbar.setScrollFactor(0,0);

        this.relleno_healthbar = this.scene.add.sprite(213, 52, 'relleno_healthbar');
        this.relleno_healthbar.setScale(0.60);
        this.relleno_healthbar.setScrollFactor(0,0);

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.j = this.scene.input.keyboard.addKey('J');
        this.w = this.scene.input.keyboard.addKey('W');
        this.a = this.scene.input.keyboard.addKey('A');
        this.d = this.scene.input.keyboard.addKey('D');
        
        this.relleno_healthbar.setCrop(0,0,this.relleno_healthbar.width*((this.health/ 100)), 317);
        this.relleno_healthbar.isCropped = true;
    }

    
    
    makeDamage(){
       // if(level_melee == 1){
        this.scene.physics.overlap(this.body, this.scene.enemies,(hitbox, enemy) => {
          enemy.getDamage(40);
        });
        //}
    }
/*
    *
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        let isRunning = false;
        let isDashing = false;

        if (Phaser.Input.Keyboard.JustDown(this.j) && !this.isAttacking) {
            this.isAttacking = true;
            this.attackCount++; // Incrementar el contador de ataques

            this.scene.time.delayedCall(200, () => {if(!this.hasBeenHurt)this.makeDamage();}, [], this);

            if (this.attackCount === 1) {
                // Primer ataque: reproducir animación de ataque 1
                this.play('attack1', true);
                this.on('animationcomplete-attack1', () => {
                    this.isAttacking = false;
                });
            } else if (this.attackCount === 2) {
                // Segundo ataque: reproducir animación de ataque 2
                this.play('attack2', true);
                this.on('animationcomplete-attack2', () => {
                    this.isAttacking = false;
                });
                this.attackCount = 0;
            }           
        }
        
    
        if(this.cursors.shift.isDown){ //dash derecha
            this.body.setVelocityX(this.speed *1.5);
            this.setFlipX(false);
            isDashing = true;
            isRunning = true;
        }    
        if (this.cursors.up.isDown /*|| Phaser.Input.Keyboard.isDown(this.w))*/ && this.body.onFloor()) {
            this.body.setVelocityY(this.jumpSpeed);
            isRunning = true;
        }
        if (this.cursors.left.isDown /*|| Phaser.Input.Keyboard.isDown(this.a)*/) {
            this.body.setVelocityX(-this.speed);
            this.setFlipX(true);
            isRunning = true;
        }
        else if (this.cursors.right.isDown /*|| Phaser.Input.Keyboard.isDown(this.d)*/) {
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
            } else if(!this.isAttacking && isRunning && isDashing){
                this.play('dash',true);
            }
        }
        
    }

}
