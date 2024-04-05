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
        
        const Collectible_list = [];
        this.collectible_list = Collectible_list;

        this.fondo = this.add.tileSprite(0, 0, this.game.config.width+100, this.game.config.height, 'background');
        this.fondo.setScrollFactor(0,0);
        this.fondo.setScale(2.5, 2.2);
        

        this.map = this.make.tilemap({key: 'tilemap3'});

        const mainMap = this.map.addTilesetImage('main', 'mainMap');

        this.groundLayer = this.map.createLayer('Plataformas', mainMap);
        this.wallLayer = this.map.createLayer('Paredes', mainMap);
        
        this.groundLayer.setCollisionByProperty({colision:true});
        this.wallLayer.setCollisionByProperty({colision:true});

        this.enemies = this.add.group();

        //this.backWallLayer.setCollisionByProperty({colision:true});
        
        
        this.wolf = new Wolf(this, 3605, 500);
        this.wolf2 = new Wolf(this, 4100, 402);
        this.player = new Player(this, 500, 400);

        this.enemies.add(this.wolf);
        this.enemies.add(this.wolf2);

        this.physics.world.setBounds(0, -4470, 7566, 7000); // Cambiar los valores según sea necesario

        // Establecer los límites de desplazamiento de la cámara
        this.cameras.main.setBounds(0, -4470, 8500, 6100); // Casi coincidir con el tamaño del mundo del juego
    

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
        this.physics.add.collider(this.player, this.wallLayer);
        this.physics.add.collider(this.enemies, this.wallLayer);

    }

    playerDeath() {
        this.time.delayedCall(4000, () => {
            this.player.respawn();
        }, [], this);
    }
    

    update(){
        this.fondo.tilePositionX = this.playerCamera.scrollX * 0.1;
    }

    pause_function(){
        this.scene.launch('pause',{collectible_list: this.collectible_list});
        this.scene.pause();
    }
    
}
