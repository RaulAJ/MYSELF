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
        
        
        this.fondo = this.add.tileSprite(0, 0, this.game.config.width+100, this.game.config.height, 'background');
        this.fondo.setScrollFactor(0,0);
        this.fondo.setScale(2.5, 2.2);
        

        this.map = this.make.tilemap({key: 'tilemap'});

        const mainMap = this.map.addTilesetImage('main', 'mainMap');



        this.groundLayer = this.map.createLayer('Plataformas', mainMap);
        
        this.groundLayer.setCollisionByProperty({colision:true});

        this.enemies = this.add.group();

        //this.backWallLayer.setCollisionByProperty({colision:true});
        
        
        this.player = new Player(this, 500, 400);
        this.wolf = new Wolf(this, 3605, 500);
        //this.fox = new Fox(this,150,300);
        this.enemies.add(this.wolf);
        //this.enemies.add(this.fox);

        this.physics.world.setBounds(0, -4470, 5000, 6000); // Cambiar los valores según sea necesario

        // Establecer los límites de desplazamiento de la cámara
        this.cameras.main.setBounds(0, -4470, 5000, 5100); // Casi coincidir con el tamaño del mundo del juego
    

        this.playerCamera = this.cameras.main.startFollow(this.player, false, 1, 1, 0, 75);

        this.pantalla_completa = this.add.image(990, 10, 'pantalla_completa', 0).setOrigin(1, 0).setInteractive();
        this.pantalla_completa.setScale(0.04);
        this.pantalla_completa.setScrollFactor(0,0);
        // Agregar evento de clic para el botón de pantalla completa
        this.pantalla_completa.on('pointerup', () => {
            if (!this.scale.isFullscreen) { // Si no está en pantalla completa
                this.scale.startFullscreen(); // Activar el modo de pantalla completa
            } else {
                this.scale.stopFullscreen(); // Salir del modo de pantalla completa
            }
        });
       

        this.physics.add.collider(this.player, this.groundLayer);
        this.physics.add.collider(this.enemies, this.groundLayer);

    }

    playerDeath() {
        this.time.delayedCall(4000, () => {
            this.player.respawn();
        }, [], this);
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
