import Player from './player.js';
import Wolf from './wolf.js';
import Spider from './spider.js';
import Minotaur from './minotaur.js';
/*import WolfBoss from './wolfboss.js';
import FinalBoss from './finalboss.js';*/
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

        this.fondo_sky = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height+45, 'background_sky');
        this.fondo_sky.setScrollFactor(0,0);
        this.fondo_sky.setScale(2.0, 2.0);

        this.fondo_clouds = this.add.tileSprite(0, 0, this.game.config.width+2000, this.game.config.height-90, 'background_clouds');
        this.fondo_clouds.setScrollFactor(0,0);
        this.fondo_clouds.setScale(0.8, -0.5);

        this.fondo_grounds = this.add.tileSprite(0, 470, this.game.config.width+235, this.game.config.height-435, 'background_grounds');
        this.fondo_grounds.setScrollFactor(0,0);
        this.fondo_grounds.setScale(3.0, 2.0);
        
        

        this.map = this.make.tilemap({key: 'tilemap4'});

        const mainMap = this.map.addTilesetImage('main', 'mainMap');
        const zone4 = this.map.addTilesetImage('zona4', 'zone4');
        this.groundLayer = this.map.createLayer('Plataformas', [mainMap,zone4]);
        this.wallLayer = this.map.createLayer('Paredes', [mainMap,zone4]);
        
        this.groundLayer.setCollisionByProperty({colision:true});
        this.wallLayer.setCollisionByProperty({colision:true});

        this.enemies = this.add.group();

        //this.backWallLayer.setCollisionByProperty({colision:true});
        
        //this.boss1 = new WolfBoss(this, 800, 1000);
        //this.finalBoss = new FinalBoss(this, 800, 1000);
        this.wolf = new Wolf(this, 3605, 500);
        this.wolf2 = new Wolf(this, 4100, 402);
        this.spider = new Spider(this, 1800, 1100);
        this.minotaur = new Minotaur(this, 1200, 1100);
        this.player = new Player(this, 500, 1200);

        this.enemies.add(this.wolf);
        this.enemies.add(this.wolf2);
        this.enemies.add(this.spider);
        this.enemies.add(this.minotaur);
       // this.enemies.add(this.finalBoss);
       // this.enemies.add(this.boss1);
        this.physics.world.setBounds(0, -13870, 23566, 20000); // Cambiar los valores según sea necesario

        // Establecer los límites de desplazamiento de la cámara
        this.cameras.main.setBounds(0, -13870, 23500, 19800); // Casi coincidir con el tamaño del mundo del juego
    

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


       /* const config = {
            mute: false,
            volume: 0.15,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        };

        this.musica_ambiente = this.sound.add("musica_ambiente", config);
        this.musica_ambiente.play();
*/
    }

    playerDeath() {
        this.time.delayedCall(4000, () => {
            this.player.respawn();
        }, [], this);
    }
    

    update(){
        this.fondo_clouds.tilePositionX = this.playerCamera.scrollX * 0.1;
        this.fondo_sky.tilePositionX = this.playerCamera.scrollX * 0.05;
        this.fondo_grounds.tilePositionX = this.playerCamera.scrollX * 0.2;
    }

    pause_function(){
        this.scene.launch('pause',{collectible_list: this.collectible_list});
        this.scene.pause();
    }
    
}
