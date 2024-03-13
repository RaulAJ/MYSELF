import Player from './player.js';
import Wolf from './wolf.js';
import Fox from './fox.js';
import Phaser from 'phaser'


/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'level' });
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
        

        this.fondo = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'background');
        this.fondo.setScrollFactor(0,0);
        this.fondo.setScale(2, 2.2);

        this.enemies = this.add.group();

        this.plant1 = this.add.image(200, 485, 'crystal');
        this.plant1.setDisplaySize(46, 36); // Cambiar el tamaño a 100x100 píxeles
        this.player = new Player(this, 500, 500);
        this.wolf = new Wolf(this, 100, 250);
        //this.fox = new Fox(this,150,300);
        this.enemies.add(this.wolf);
        //this.enemies.add(this.fox);

        this.physics.world.setBounds(0, -500, 2000, 1000); // Cambiar los valores según sea necesario


        

        // Establecer los límites de desplazamiento de la cámara
        this.cameras.main.setBounds(0, -500, 2000, 1000); // Deben coincidir con el tamaño del mundo del juego
    
        

        this.playerCamera = this.cameras.main.startFollow(this.player, false, 1, 1, 0, 75);

        

    }
    
    update(){
        this.fondo.tilePositionX = this.playerCamera.scrollX * 0.1;
    }

    /**
     * Método que se ejecuta al coger una estrella. Se pasa la base
     * sobre la que estaba la estrella cogida para evitar repeticiones
     * @param {Base} base La base sobre la que estaba la estrella que se ha cogido
     */
    /*starPickt(base) {
        this.player.point();
        if (this.player.score == this.stars) {
            this.scene.start('end');
        }
        else {
            let s = this.bases.children.entries;
            this.spawn(s.filter(o => o !== base));

        }
    }*/

    
}
