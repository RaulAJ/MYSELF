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
        // variables de ataque
        this.level_melee = 1;  // nivel del arma melee para saber daño y posibilidades del mismo
        this.level_distance = 1; // lo mismo pero con el arma a distancia
        this.damage_melee = 40; // daño que haces a melee
        this.damage_distance = 20; // daño que haces a distancia
        this.enemies_melee = 0;  // numero de enemigos derrotados con el arma a melee
        this.enemies_distance = 0; // numero de enemigos derrotados con el arma a distancia
        // variables para el dash
        this.isDashing = false;
        this.lastDash = 0;
        this.dashCooldown = 500;
        //variables para el doble salto
        this.doubleJumpON = false;
        this.doubleJumpAvailiable = false;

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
        /*this.w = this.scene.input.keyboard.addKey('W');
        this.a = this.scene.input.keyboard.addKey('A');
        this.d = this.scene.input.keyboard.addKey('D');
        */
        this.relleno_healthbar.setCrop(0,0,this.relleno_healthbar.width*((this.health/ 100)), 317);
        this.relleno_healthbar.isCropped = true;
    }

    levelUpMelee(){
        if(this.level_melee == 1 && this.enemies_melee == 50){
            this.level_melee = 2;
            this.enemies_melee = 0;
            this.damage_melee = 50;
        }
        
        if(this.level_melee == 2 && this.enemies_melee == 100){
            this.level_melee = 3;
            this.enemies_melee = 0;
            this.damage_melee = 80;
        }
    }
    
    levelUpDistance(){
        if(this.level_distance == 1 && this.enemies_distance == 30){
            this.level_distance = 2;
            this.enemies_distance = 0;
            this.damage_distance = 40;
        }
        
        if(this.level_distance == 2 && this.enemies_distance == 70){
            this.level_distance = 3;
            this.enemies_distance = 0;
            this.damage_distance = 60;
        }
    }
    

    makeDamage(){
        this.scene.physics.overlap(this.body, this.scene.enemies,(hitbox, enemy) => {
          enemy.getDamage(this.damage_melee);
        });

    }

    dash(){
        isDashing = true;
        lastDash = this.time.now;

        this.body.setVelocityX(this.speed * 2);

        this.time.delayedCall(200, function(){isDashing = false;}, [], this);
    }

    doubleJump(){
        this.body.setVelocityY(this.jumpSpeed);
        isRunning = true;
        this.doubleJumpAvailiable = false;
    }
    /*  
    
    *
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        let isRunning = false;

        
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
            
           // if(!isDashing){
                if (this.cursors.up.isDown /*|| Phaser.Input.Keyboard.isDown(this.w))*/ && this.body.onFloor()) {
                    this.body.setVelocityY(this.jumpSpeed);
                    isRunning = true;
                    if(this.doubleJumpON == true)
                        this.doubleJumpAvailiable = true;
                }
                else if(this.cursors.up.isDown && this.doubleJumpAvailiable){
                    this.doubleJump();
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
                
                /*
                if(this.cursors.SPACE.isDown && this.time.now > lastDash + dashCooldown){
                    this.dash();
                }*/
            //}

      
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
            } /*else if(!this.isAttacking && isRunning && isDashing && this.body.onFloor()){
                this.play('dash',true);
            }*/
        }
        
    }

}
