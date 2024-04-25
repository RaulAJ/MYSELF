import Enemy from './enemy.js';
import Player from './player.js';

export default class Wolf extends Enemy {

    constructor(scene, x, y) {
        super(scene, x, y, 100, 75, 0, 400, 50, 100, 25);
        this.setDisplaySize(180, 140);
        this.body.setSize(70, 60);
        this.body.setOffset(40, 70);
        this.setScale(2.2, 2);

        // Queremos que el enemigo no se salga de los límites del mundo
        this.body.setCollideWorldBounds();

        // Animación inicial default
        this.play('wolfBoss_stand');
    }

    getDamage(damage) {
        if(this.health>0){
            if(this.health>=damage){
                this.health-=damage;
                //this.play('wolf_hurt',true);
            }
            else{
                this.health = 0;
                
                this.anims.play('wolfBoss_dead',true);
                this.body.setVelocityX(0);
                this.scene.time.delayedCall(5000, () => {this.destroy();}, [], this);
            }
        }
    }

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
    
    makeDamage(damage){
        this.scene.physics.overlap(this.body, this.scene.player, (hitbox, player) => {
            player.getDamage(damage); // Aplicar daño al jugador
        });
     }

    attack(){
        if(this.scene.player.health > 0 && (this.x - this.rangeAttack < this.scene.player.x)  && (this.scene.player.x < this.x + this.rangeAttack) && ( this.y - this.rangeAttack < this.scene.player.y)  && (this.scene.player.y < this.y + this.rangeAttack) && this.health > 0){
          this.body.setVelocityX(0);

          if(this.canAttack === true && this.health > 0){
            this.canAttack = false;
            //this.scene.time.delayedCall(400, () => {if(!this.hasBeenHurt)this.dealWeaponDamage();}, [], this);
            this.canAnimate = false;
            //this.isOnAction = true;
            this.play('wolfBoss_attack',true);
            this.on('animationcomplete-wolfBoss_attack', function attackCompleteCallback() {
                // Desvincular el evento después de que se dispare por primera vez
                this.off('animationcomplete-wolfBoss_attack', attackCompleteCallback);
            
                // Lógica que quieres ejecutar cuando la animación 'wolf_attack' se completa
                this.canAttack = true;
                this.canAnimate = true;
                this.makeDamage(this.damage);
            });
            
          }
          return true;
        }
        return false;
    }

    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del enemigo.
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        // Verificar si el enemigo está en movimiento
        if(this.health > 0){
            if(!this.attack()){
                this.move();
            }
        
            if(this.canAnimate){    
                if (this.body.velocity.x !== 0) {
                    // Si se está moviendo, reproducir la animación de movimiento
                    this.anims.play('wolfBoss_walk', true);

                } else {
                    // Si no se está moviendo, reproducir la animación de estar quieto
                    this.anims.play('wolfBoss_stand', true);
                }
            }
        }

        this.updateHealthBar();
    }
    
}