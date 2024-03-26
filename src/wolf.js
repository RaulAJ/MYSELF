import Enemy from './enemy.js';

export default class Wolf extends Enemy {

    constructor(scene, x, y) {
        super(scene, x, y, 100, 75, 0, 400, 60, 100, 20);
        this.setDisplaySize(180, 140);
        this.body.setSize(70, 60);
        this.body.setOffset(40, 70);
        this.setScale(1.2, 1);

        // Queremos que el enemigo no se salga de los límites del mundo
        this.body.setCollideWorldBounds();

        // Animación inicial default
        this.play('wolf_stand');
    }

    getDamage(damage) {
        if(this.health>0){
            if(this.health>=damage){
                this.health-=damage;
            }
            else{
                this.health = 0;
                
                this.anims.play('wolf_dead',true);
                this.body.setVelocityX(0);
                this.scene.time.delayedCall(10000, () => {this.destroy();}, [], this);
            }
        }
    }

    move(){
        if((this.x - this.fieldOfView < this.scene.player.x)  && (this.scene.player.x < this.x + this.fieldOfView) && (this.y - this.fieldOfView< this.scene.player.y)  && (this.scene.player.y < this.y + this.fieldOfView )){
            
            if((this.x - 40 < this.scene.player.x)  && (this.scene.player.x < this.x + 40)){
                this.body.setVelocityX(0);
            }
            else if (this.scene.player.x < this.x && (this.scene.groundLayer.hasTileAtWorldXY(this.x, this.y + 110) /*|| this.scene.platformLayer.hasTileAtWorldXY(this.x, this.y + 110)) && !this.scene.wallLayer.hasTileAtWorldXY(this.x -35, this.y + 50) && !this.scene.groundLayer.hasTileAtWorldXY(this.x -35, this.y + 50*/)) {
                this.body.setVelocityX(-this.speed);
                this.setFlipX(true);
            }
            else if (this.scene.player.x>this.x&& (this.scene.groundLayer.hasTileAtWorldXY(this.x + 135, this.y + 110) /*|| this.scene.platformLayer.hasTileAtWorldXY(this.x + 135, this.y + 110)) && !this.scene.wallLayer.hasTileAtWorldXY(this.x + 175, this.y + 50) && !this.scene.groundLayer.hasTileAtWorldXY(this.x + 175, this.y + 50*/)) {
                this.body.setVelocityX(this.speed);
                this.setFlipX(false);
            }
            else{
                this.body.setVelocityX(0);
            }
            if(this.x > this.scene.player.x){
                this.setFlipX(true);
            }
            else{
                this.setFlipX(false);
            }
        }
        else{
            this.body.setVelocityX(0);
        }
    }


    attack(){
        if(this.scene.player.health > 0 && (this.x - this.rangeAttack < this.scene.player.x)  && (this.scene.player.x < this.x + this.rangeAttack) && ( this.y - this.rangeAttack < this.scene.player.y)  && (this.scene.player.y < this.y + this.rangeAttack) && this.health > 0){
          this.body.setVelocityX(0);
          /*if (this.scene.player.x < this.x) {
            this.weaponHitbox.setX(-15);
            this.setFlipX(true);
            //this.sprite.x = this.oldX = 70;  
            
          }
          else if (this.scene.player.x>this.x) {
            this.weaponHitbox.setX(150);
            this.setFlipX(false);
            //this.sprite.x = this.oldX = 60;
          }*/
          if(this.canAttack === true && this.health > 0){
            this.canAttack = false;
            //this.scene.time.delayedCall(400, () => {if(!this.hasBeenHurt)this.dealWeaponDamage();}, [], this);
            this.canAnimate = false;
            //this.isOnAction = true;
            this.play('wolf_attack',true);
            /*
            //this.oldX = this.sprite.x;
  
            this.scene.time.delayedCall(1000, () => {
              //this.isOnAction = false;
              if(this.health > 0){
                this.canAnimate = true;
              }
            }, [], this);*/
            this.scene.time.delayedCall(this.attackSpeed, () => {this.canAttack = true;this.canAnimate = true;}, [], this);
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
        if(this.health >= 0){
            if(!this.attack()){
                this.move();
            }
        
            if(this.canAnimate){    
                if (this.body.velocity.x !== 0) {
                    // Si se está moviendo, reproducir la animación de movimiento
                    this.anims.play('wolf_walk', true);

                } else {
                    // Si no se está moviendo, reproducir la animación de estar quieto
                    this.anims.play('wolf_stand', true);
                }
            }
        }

        this.updateHealthBar();
    }
    
}