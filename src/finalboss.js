import Enemy from './enemy.js';
import Player from './player.js';

export default class FinalBoss extends Enemy {

    constructor(scene, x, y) {
        super(scene, x, y, 550, 75, 0, 400, 50, 100, 30);
        this.setDisplaySize(180, 140);
        //this.body.setSize(70, 60);
        this.scene = scene;  // Asegúrate de guardar una referencia a la escena

        this.body.setOffset(20, 25);
        this.setScale(2.2, 2);

        // Queremos que el enemigo no se salga de los límites del mundo
        this.body.setCollideWorldBounds();

        // Animación inicial default
        this.play('finalBoss_stand');

        const config = {
            mute: false,
            volume: 0.10,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        };
    }

    getDamage(damage) {
        if (this.health > 0) {
            if (this.health >= damage) {
                this.health -= damage;
                // this.play('finalBoss_hurt', true);
            } else {
                this.health = 0;
                this.play('finalBoss_dead', true);
                this.body.setVelocityX(0);
    
                // Usamos delayedCall para destruir el objeto y llamar a this.scene.end() después de 3 segundos
                this.scene.time.delayedCall(3000, (scene) => {
                    this.destroy();
                    scene.end();
                }, [this.scene], this);
            }
        }
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
            this.play('finalBoss_attack',true);
            this.on('animationcomplete-finalBoss_attack', function attackCompleteCallback() {
                // Desvincular el evento después de que se dispare por primera vez
                this.off('animationcomplete-finalBoss_attack', attackCompleteCallback);
            
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
                    this.anims.play('finalBoss_walk', true);

                } else {
                    // Si no se está moviendo, reproducir la animación de estar quieto
                    this.anims.play('finalBoss_stand', true);
                }
            }
        }

        this.updateHealthBar();
    }
    updateHealthBar() {
        if(this.health > 0){
            const barWidth = this.width/2; // Ancho de la barra de vida igual al ancho del enemigo
            const barHeight = 5; // Alto de la barra de vida
            const padding = -30; // Espacio entre la barra de vida y el enemigo
            const barX = this.x - (barWidth + 100); // Posición horizontal de la barra de vida
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