import Enemy from './enemy.js';
import Player from './player.js';

export default class Wolf extends Enemy {

    constructor(scene, x, y) {
        super(scene, x, y, 100, 75, 0, 400, 50, 100, 20);
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
                //this.beast_hit.play();
                //this.play('wolf_hurt',true);
            }
            else{
                this.health = 0;
                
                this.anims.play('wolf_dead',true);
                this.body.setVelocityX(0);
                this.scene.time.delayedCall(5000, () => {this.destroy();}, [], this);
            }
        }
    }

    makeDamage(damage){
        this.scene.physics.overlap(this.body, this.scene.player, (hitbox, player) => {
            player.getDamage(damage); // Aplicar daño al jugador
        });
        this.beast_hit.play();

     }

    respawn() {
        // Restablecer la posición del jugador a su punto de aparición inicial
        this.x = this.spawnX+10;
        this.y = this.spawnY+10;
    
        // Restablecer la vida del jugador y otras propiedades
        this.health = 100;
 
        // Reproducir la animación de estar de pie
        this.play('wolf_stand');
    
    }

    attack(){
        if(this.scene.player.health > 0 && (this.x - this.rangeAttack < this.scene.player.x)  && (this.scene.player.x < this.x + this.rangeAttack) && ( this.y - this.rangeAttack < this.scene.player.y)  && (this.scene.player.y < this.y + this.rangeAttack) && this.health > 0){
          this.body.setVelocityX(0);

          if(this.canAttack === true && this.health > 0){
            this.canAttack = false;
            //this.scene.time.delayedCall(400, () => {if(!this.hasBeenHurt)this.dealWeaponDamage();}, [], this);
            this.canAnimate = false;
            //this.isOnAction = true;
            this.play('wolf_attack',true);
            this.on('animationcomplete-wolf_attack', function attackCompleteCallback() {
                // Desvincular el evento después de que se dispare por primera vez
                this.off('animationcomplete-wolf_attack', attackCompleteCallback);
            
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