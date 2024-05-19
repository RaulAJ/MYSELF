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

        this.canMove = true; // Inicializar la variable canMove como true para permitir que el jugador se mueva
        this.canDoubleJump = true; //cambiar luego
        this.canShrink = true;
        this.canDash = false; //cambiar luego
        this.doubleJumped = false;
        this.dashed = false;
        this.shrinked = false;
        this.isShrinking = false;
        this.gettingHurt = false;
        this.hitten = false;
        this.spawnX = this.x;
        this.spawnY = this.y;

        //this.positionText = this.scene.add.text(500, 50, 'Posición: (0, 0)', { fontSize: '24px', fill: '#ffffff' }).setScrollFactor(0);

        this.scene.add.existing(this);
        this.originalBodySize = {width: 35, height: 52};
        this.scene.physics.add.existing(this);
        this.setDisplaySize(180, 140);
        this.body.setSize(this.originalBodySize.width, this.originalBodySize.height);
        this.body.setOffset(39, 20);
        this.setScale(1.5, 1.6);
        this.body.setCollideWorldBounds();
        this.speed = 250;
        this.jumpSpeed = -400;
        this.play('stand');

        this.healthbar = this.scene.add.sprite(185, 52, 'healthbar');
        this.healthbar.setScale(0.60);
        this.healthbar.setScrollFactor(0,0);

        this.relleno_healthbar = this.scene.add.sprite(213, 52, 'relleno_healthbar');
        this.relleno_healthbar.setScale(0.60);
        this.relleno_healthbar.setScrollFactor(0,0);

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.j = this.scene.input.keyboard.addKey('J');
        this.k = this.scene.input.keyboard.addKey('K');
        this.w = this.scene.input.keyboard.addKey('W');
        this.a = this.scene.input.keyboard.addKey('A');
        this.d = this.scene.input.keyboard.addKey('D');
        this.ctrl = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
        this.esc = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.relleno_healthbar.setCrop(0,0,this.relleno_healthbar.width*((this.health/ 100)), 317);
        this.relleno_healthbar.isCropped = true;

        const config = {
            mute: false,
            volume: 0.10,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
        };
        this.slash_hit = this.scene.sound.add("slash_hit", config);
        this.slash_attack1 = this.scene.sound.add("slash_attack1", config);
        this.slash_attack2 = this.scene.sound.add("slash_attack2", config);
        this.player_hurt = this.scene.sound.add("player_hurt", config);



    }

    createAttackHitbox(){
        //hitbox adicional
        this.attackHitbox = this.scene.physics.add.sprite(this.x, this.y, 'attackHitboxTexture');
        this.attackHitbox.setSize(this.originalBodySize.width, this.originalBodySize.height);
        if(!this.flipX){
            this.attackHitbox.setOffset(30, -6);
        }
        else{
            this.attackHitbox.setOffset(-30,-6)
        }
        this.attackHitbox.body.setAllowGravity(false);
        this.attackHitbox.body.setCollideWorldBounds(false);
        this.attackHitbox.setActive(true);
        this.attackHitbox.setVisible(false);
        this.attackHitbox.setScale(1.5,1.6);
    }

    destroyAttackHitbox(){
        this.attackHitbox.destroy();
    }

    shrinkTween() {
        // Crear y ejecutar el tween de encogimiento
        
        let tween = this.scene.tweens.add({
            targets: this,
            duration: 1000,
            scaleX: 0.7,
            scaleY: 0.7,
            ease: 'Quad',
            yoyo: false,
            repeat: 0,
            onComplete: () => {
                this.isShrinking = false;
            }
        });
        
    }

    backtoNormalTween(){
        //agrandarse cuando has encogido

        let tween = this.scene.tweens.add({
            targets: this,
            duration: 1000,
            scaleX: 1.5,
            scaleY: 1.6,
            ease: 'Quad',
            yoyo: false,
            repeat: 0
        });
    }

    death(){
        this.health -= 100;
        this.canMove = false;
    }

    getDamage(damage) {
        this.health-=damage;
        if(this.health > 0 && !this.isAttacking){    
            this.play('hurt', true);
            this.player_hurt.play();
            this.gettingHurt = true;
            this.canMove = false;
            this.on('animationcomplete-hurt', () => {
                this.gettingHurt = false;
                this.canMove = true;
            });
        }
    }

    checkRestZones(){
        if(this.body.velocity.x !== 0){
            this.scene.physics.overlap(this.body, this.scene.restZones,(hitbox, restZone) => {
            this.spawnX = restZone.x;
            this.spawnY = restZone.y;
            this.health = 100;
        });
    }
    }

    makeDamage(attackCount){
        
        this.scene.physics.overlap(this.attackHitbox.body, this.scene.enemies,(hitbox, enemy) => {
          enemy.getDamage(40);
          this.slash_hit.play();
        });
        
        this.scene.physics.overlap(this.attackHitbox.body, this.scene.bosses,(hitbox, boss) => {
            boss.getDamage(40);
            this.slash_hit.play();
        });
        if(attackCount === 1)
            this.slash_attack1.play();
        else
            this.slash_attack2.play();
    }

    make_pause(){
        if (Phaser.Input.Keyboard.JustDown(this.esc)) { 
         this.scene.pause_function();
        }
    }

    /*adjustHitbox(){
        if(this.flipX){
            this.body.setSize(this.originalBodySize.width * 1.4, this.originalBodySize.height);
            this.body.setOffset(25, 21);
        }
        else{
            this.body.setSize(this.originalBodySize.width * 1.4, this.originalBodySize.height);
            this.body.setOffset(43, 21);
        }
    }

    readjustHitbox(){
        this.body.setSize(this.originalBodySize.width, this.originalBodySize.height);
        this.body.setOffset(39, 20);
    }*/

    respawn() {
        // Restablecer la posición del jugador a su punto de aparición inicial
        this.x = this.spawnX+10;
        this.y = this.spawnY+10;
    
        // Restablecer la vida del jugador y otras propiedades
        this.health = 100;
        this.attackCount = 0;
        this.canMove = true;
    
        // Reproducir la animación de estar de pie
        this.play('stand');
    }
    /*
    *
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.checkRestZones();
        let isRunning = false;
       // this.positionText.setText('Posición: (' + this.x + ', ' + this.y + ')');

        if (!this.canMove) {
            // Si el jugador no puede moverse, establecer la velocidad del jugador en 0 y salir de preUpdate
            this.body.setVelocity(0);
            return;
        }

        if (Phaser.Input.Keyboard.JustDown(this.w)) {
            if (this.body.onFloor() || (this.canDoubleJump && !this.body.onFloor() && !this.doubleJumped)) {
                if (!this.body.onFloor()) {
                    this.doubleJumped = true; // Registrar el doble salto
                }
                this.body.setVelocityY(this.jumpSpeed);
                isRunning = true;
            }
        }
        // Restablecer el doble salto cuando el jugador toca el suelo
        if (this.body.onFloor()) {
            this.doubleJumped = false;
        }

        if (Phaser.Input.Keyboard.JustDown(this.j) && !this.isAttacking) {
            this.isAttacking = true;
            this.attackCount++; // Incrementar el contador de ataques

            this.createAttackHitbox();
            this.scene.time.delayedCall(200, () => {
                    if (!this.hasBeenHurt) 
                        this.makeDamage(this.attackCount);
                    
                }, [], this);
            if (this.attackCount === 1) {
                // Primer ataque: reproducir animación de ataque 1
                this.play('attack1', true);
                this.on('animationcomplete-attack1', () => {
                    this.isAttacking = false;
                    this.destroyAttackHitbox();
                });
            } else if (this.attackCount === 2) {
                // Segundo ataque: reproducir animación de ataque 2
                this.play('attack2', true);
                this.on('animationcomplete-attack2', () => {
                    this.isAttacking = false;
                    this.destroyAttackHitbox();
                });
                this.attackCount = 0;
            }           
        }

        if(Phaser.Input.Keyboard.JustDown(this.ctrl)){
            if(!this.shrinked){
            this.shrinkTween();
            this.shrinked = true;
            this.isShrinking = true;
            }
            else{
                this.backtoNormalTween();
                this.shrinked = false;
            }
        }
       
        if (this.a.isDown) {
            if(this.dashed){
                this.body.setVelocityX(-this.speed * 1.7);
            }
            else{
                this.body.setVelocityX(-this.speed);
            }
            this.setFlipX(true);
            isRunning = true;
        }
        else if (this.d.isDown) {
            if(this.dashed){
                this.body.setVelocityX(this.speed * 1.7);
            }
            else{
                this.body.setVelocityX(this.speed);
            }
            this.setFlipX(false);
            isRunning = true;
        }
        else {
            this.body.setVelocityX(0);
            isRunning = false;
        }
        if(Phaser.Input.Keyboard.JustDown(this.cursors.shift) && this.canDash && !this.dashed){
            this.dashed = true;
            this.body.setVelocityY(0); // Detener cualquier movimiento vertical
            this.body.setAllowGravity(false);

        }  
        if (this.y >= 8000 || this.health <= 0) {
            // Llama a la función death(), y luego espera 4 segundos antes de llamar a respawn()
            this.play('death');
            this.death();
            this.scene.playerDeath();
        } else {
            if(!this.isAttacking && this.dashed){
                this.play('dash',true);
                this.on('animationcomplete-dash', () => {
                    this.dashed = false;
                    this.body.setAllowGravity(true);
                });
            } else if (!this.isAttacking && !this.body.onFloor() && !this.isShrinking) {
                this.play('jump', true);
            }
            else if (!this.isAttacking && isRunning) {
                this.play('run', true); 
            } else if (!this.isAttacking) {
                this.play('stand', true);
            } 
        }
        this.relleno_healthbar.setCrop(0,0,this.relleno_healthbar.width*((this.health/ 100)), 317);
        this.relleno_healthbar.isCropped = true;
        
        this.make_pause();
    }

}