import Enemy from './enemy.js';

export default class Fox extends Enemy {
    
    constructor(scene, x, y) {
        super(scene, x, y, 70, 90, 5, 60, 10, 10, 10);
        this.setDisplaySize(180, 140);
        this.body.setSize(70, 60);
        this.body.setOffset(40, 70);
        this.setScale(1.2, 1);

        // Queremos que el enemigo no se salga de los límites del mundo
        this.body.setCollideWorldBounds();

        // Animación inicial default
        this.play('fox-sword');
    }

    getDamage(damage) {
        if(this.health>0){
            if(this.health>=damage){
                this.health-=damage;
            }
            else{
                this.health = 0;
                
                this.body.setVelocityX(0);
                this.scene.time.delayedCall(10000, () => {this.destroy();}, [], this);
            }
        }
    }

    makeDamage(){
        this.scene.physics.overlap(this.body, this.scene.player,(hitbox, player) => {
          this.damage;
        });
    }

    move(){
        if((this.x - this.fieldOfView < this.scene.player.x)  && (this.scene.player.x < this.x + this.fieldOfView) && (this.y - this.fieldOfView< this.scene.player.y)  && (this.scene.player.y < this.y + this.fieldOfView )){
            if((this.x - 10 < this.scene.player.x)  && (this.scene.player.x < this.x + 10)){
                this.body.setVelocityX(0);
            }
            else if (this.scene.player.x<this.x && (this.scene.groundLayer.hasTileAtWorldXY(this.x, this.y + 110) || this.scene.platformLayer.hasTileAtWorldXY(this.x, this.y + 110)) && !this.scene.wallLayer.hasTileAtWorldXY(this.x -35, this.y + 50) && !this.scene.groundLayer.hasTileAtWorldXY(this.x -35, this.y + 50)) {
                this.body.setVelocityX(-this.speed);
                
            }
            else if (this.scene.player.x>this.x&& (this.scene.groundLayer.hasTileAtWorldXY(this.x + 135, this.y + 110) || this.scene.platformLayer.hasTileAtWorldXY(this.x + 135, this.y + 110)) && !this.scene.wallLayer.hasTileAtWorldXY(this.x + 175, this.y + 50) && !this.scene.groundLayer.hasTileAtWorldXY(this.x + 175, this.y + 50)) {
                this.body.setVelocityX(this.speed);
            }
            else{
                this.body.setVelocityX(0);
            }
        }
    }

    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del enemigo.
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        // Verificar si el enemigo está en movimiento
        if(this.health > 0){
           //this.move();

            
            if (this.body.velocity.x !== 0) {
                // Si se está moviendo, reproducir la animación de movimiento
                this.anims.play('fox_walk', true);

            } else {
                // Si no se está moviendo, reproducir la animación de estar quieto
                this.anims.play('fox_stand', true);
            }
        }

        this.updateHealthBar();
    }
}