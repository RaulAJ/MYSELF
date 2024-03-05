import Enemy from './enemy.js';

export default class Wolf extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'wolf', 100); // Textura 'wolf' y salud inicial de 100
        this.setDisplaySize(180, 140);
        this.body.setSize(70, 60);
        this.body.setOffset(40, 70);
        this.setScale(1.2, 1);

        this.distanciaMinima = x;
        this.distanciaMaxima = x + 200; // Cambia este valor según el rango deseado

        // Inicia el movimiento automáticamente
        this.moverDerecha = true;

        // Inicia el temporizador para controlar el movimiento repetido
        this.timer = scene.time.addEvent({
            delay: 50, // Intervalo de tiempo entre cambios de dirección
            callback: this.cambiarDireccion,
            callbackScope: this,
            loop: true // Repetir el temporizador indefinidamente
        });

        // Queremos que el enemigo no se salga de los límites del mundo
        this.body.setCollideWorldBounds();
        this.speed = 75;
        // Animación inicial default
        this.play('idle');
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

    cambiarDireccion() {
        // Cambiar la dirección del movimiento según la posición actual del enemigo
        if(this.health > 0){
            if (this.x >= this.distanciaMaxima) {
                this.moverDerecha = false;
                this.setFlipX(true);
            } else if (this.x <= this.distanciaMinima) {
                this.moverDerecha = true;
                this.setFlipX(false);
            }

            // Establecer la velocidad en la dirección correspondiente
            if (this.moverDerecha) {
                this.body.setVelocityX(this.speed);
            } else {
                this.body.setVelocityX(-this.speed);
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
        if(this.health >0){
            if (this.body.velocity.x !== 0) {
                // Si se está moviendo, reproducir la animación de movimiento
                this.anims.play('wolf_walk', true);
            } else {
                // Si no se está moviendo, reproducir la animación de estar quieto
                this.anims.play('wolf_stand', true);
            }
        }

        this.updateHealthBar();
    }
}