import Player from './player.js';
import Wolf from './wolf.js';
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
        const fondo = this.add.image(0, 0, 'background').setOrigin(0, 0);
        fondo.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        fondo.setDepth(0);
        this.plant1 = this.add.image(200, 485, 'crystal');
        this.plant1.setDisplaySize(46, 36); // Cambiar el tamaño a 100x100 píxeles
        this.wolf = new Wolf(this, 100, 250);
        this.player = new Player(this, 500, 500);

        this.physics.world.setBounds(0, -500, 2000, 1000); // Cambiar los valores según sea necesario

        // Establecer los límites de desplazamiento de la cámara
        this.cameras.main.setBounds(0, -500, 2000, 1000); // Deben coincidir con el tamaño del mundo del juego
    

        this.cameras.main.startFollow(this.player);

        

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
