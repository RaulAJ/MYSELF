import Player from './player.js';
import Wolf from './wolf.js';
import Spider from './spider.js';
import Minotaur from './minotaur.js';
import WolfBoss from './wolfboss.js';
import MinotaurBoss from './minotaurBoss.js'
import SpiderBoss from './spiderBoss.js'
import restZone from './restZone.js';
/*import FinalBoss from './finalboss.js';*/
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

        //Zona1
        this.fondo_sky = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height+45, 'background_sky');
        this.fondo_sky.setScrollFactor(0,0);
        this.fondo_sky.setScale(2.0, 2.0);

        this.fondo_clouds = this.add.tileSprite(0, 0, this.game.config.width+2000, this.game.config.height-90, 'background_clouds');
        this.fondo_clouds.setScrollFactor(0,0);
        this.fondo_clouds.setScale(0.8, -0.5);

        this.fondo_grounds = this.add.tileSprite(0, 470, this.game.config.width+235, this.game.config.height-435, 'background_grounds');
        this.fondo_grounds.setScrollFactor(0,0);
        this.fondo_grounds.setScale(3.0, 2.0);

        //Zona2
        this.mountain_sky = this.add.tileSprite(0, 0, this.game.config.width+45, this.game.config.height+45, 'mountain_sky');
        this.mountain_sky.setScrollFactor(0,0);
        this.mountain_sky.setScale(2.0, 2.0);
        this.mountain_sky.setDepth(-5);

        this.mountain1 = this.add.tileSprite(0, 0, this.game.config.width+2000, this.game.config.height-135, 'mountain_1');
        this.mountain1.setScrollFactor(0,0);
        this.mountain1.setScale(0.8, 0.5);
        this.mountain1.setDepth(-5); 

        this.mountain2 = this.add.tileSprite(0, 470, this.game.config.width+2400, this.game.config.height+1845, 'mountain_2');
        this.mountain2.setScrollFactor(0,0);
        this.mountain2.setScale(1.0, 0.5);
        this.mountain2.setDepth(-5);

        this.mountain = this.add.tileSprite(20,0,this.game.config.width, this.game.config.height+45, 'mountain');
        this.mountain.setScrollFactor(0,0);
        this.mountain.setScale(1.5,2.0);
        this.mountain.setDepth(-5);

        //Zona3
        this.cave_background = this.add.tileSprite(0, 470, this.game.config.width+235, this.game.config.height, 'cave_1');
        this.cave_background.setScrollFactor(0,0);
        this.cave_background.setScale(3.0, 2.0);
        this.cave_background.setDepth(-10);

        this.cave2_background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height+45, 'cave_2');
        this.cave2_background.setScrollFactor(0,0);
        this.cave2_background.setScale(2.0, 2.0);
        this.cave2_background.setDepth(-10);

        this.cave3_background = this.add.tileSprite(0, 0, this.game.config.width+2000, this.game.config.height-90, 'cave_3');
        this.cave3_background.setScrollFactor(0,0);
        this.cave3_background.setScale(0.8, -0.5);
        this.cave3_background.setDepth(-10);

        this.cave4_background = this.add.tileSprite(0, 470, this.game.config.width+235, this.game.config.height-435, 'cave_4');
        this.cave4_background.setScrollFactor(0,0);
        this.cave4_background.setScale(3.0, 2.0);
        this.cave4_background.setDepth(-10);

        //Zona4
        this.castle_background = this.add.tileSprite(0, 470, this.game.config.width, this.game.config.height, 'castle_background');
        this.castle_background.setScrollFactor(0,0);
        this.castle_background.setScale(2.0, 2.0);
        this.castle_background.setDepth(-15);

        this.map = this.make.tilemap({key: 'tilemap4'});

        const mainMap = this.map.addTilesetImage('main', 'mainMap');
        const zone4 = this.map.addTilesetImage('zona4', 'zone4');
        this.groundLayer = this.map.createLayer('Plataformas', [mainMap,zone4]);
        this.wallLayer = this.map.createLayer('Paredes', [mainMap,zone4]);
        
        this.groundLayer.setCollisionByProperty({colision:true});
        this.wallLayer.setCollisionByProperty({colision:true});

        this.enemies = this.add.group();
        this.bosses = this.add.group();
        this.restZones = this.add.group();
        //this.backWallLayer.setCollisionByProperty({colision:true});
        this.boss1 = new WolfBoss(this, 8100, 5000); // y 5696
        this.boss2 = new MinotaurBoss(this, 21410,1700);
        this.boss3 = new SpiderBoss(this,17400, 6600);
        //this.finalBoss = new FinalBoss(this, 21300, 3200);
     
        //Zona1
        this.wolf1 = new Wolf(this, 1200,1100);
        this.wolf2 = new Wolf(this, 1805,1100);
        this.wolf3 = new Wolf(this, 2420, 1100);
        this.wolf4 = new Wolf(this, 3405, 402);
        this.wolf5 = new Wolf(this,3605, 402);
        this.wolf6 = new Wolf(this, 4100, 402);
        this.wolf7 = new Wolf(this, 4976, 2000); //y 2976
        this.wolf8 = new Wolf(this, 4880, 3002); //y 3600
        this.wolf9 = new Wolf(this, 3635, 3002); //y 3600
        this.wolf10 = new Wolf(this, 3200, 3002); //y 3600
        this.wolf11 = new Wolf(this, 4100, 4002); //y 4224
        this.wolf12 = new Wolf(this, 4800, 4502); //y 5056
        this.wolf13 = new Wolf(this, 5600, 4502); //y 5056
        this.wolf14 = new Wolf(this, 2800, 4502); //y 5056
        this.wolf15 = new Wolf(this, 3900, 4502); //y 5056
        this.wolf16 = new Wolf(this, 6377, 2000); //y 2128
        //Zona2
        this.minotaur1 = new Minotaur(this, 9750, 1100);
        this.minotaur2 = new Minotaur(this, 10200, 1100);
        this.minotaur3 = new Minotaur(this, 11200, 1100);
        this.minotaur4 = new Minotaur(this, 11900, 1100);
        this.minotaur5 = new Minotaur(this, 12600, 1100);
        this.minotaur6 = new Minotaur(this, 13200, 1100);
        this.minotaur7 = new Minotaur(this, 13500, 1100);
        this.minotaur8 = new Minotaur(this, 14700, 1100);
        this.minotaur9 = new Minotaur(this, 16000, 1100);
        this.minotaur10 = new Minotaur(this, 16500, 1100);
        this.minotaur11 = new Minotaur(this, 16800, 1100);
        this.minotaur12 = new Minotaur(this, 19000, 1100);
        this.minotaur13 = new Minotaur(this, 20600, 900);
        this.minotaur14 = new Minotaur(this, 21200, 900);
        this.minotaur15 = new Minotaur(this, 10900, 1600);
        this.minotaur16 = new Minotaur(this, 14900, 4600);
        this.minotaur17 = new Minotaur(this, 14800, 3800);
        this.minotaur18 = new Minotaur(this, 15000, 2600);
        this.minotaur19 = new Minotaur(this, 15400, 2600);
        this.minotaur20 = new Minotaur(this, 13600, 2800);
        this.minotaur21 = new Minotaur(this, 14000, 2800);
        //Zona3
        this.spider1 = new Spider(this, 10100, 5100);
        this.spider2 = new Spider(this, 10500, 5100);
        this.spider3 = new Spider(this, 10900, 5100);
        this.spider4 = new Spider(this, 10900, 4500);
        this.spider5 = new Spider(this, 11000, 3500);
        this.spider6 = new Spider(this, 11300, 2800);
        this.spider7 = new Spider(this, 10900, 2300);
        this.spider8 = new Spider(this, 10500, 2400);
        this.spider9 = new Spider(this, 11000, 2000);
        this.spider10 = new Spider(this, 11300, 4100);
        this.spider11 = new Spider(this, 12500, 4300);
        this.spider12 = new Spider(this, 13000, 4300);
        this.spider13 = new Spider(this, 12500, 5500);
        this.spider14 = new Spider(this, 13000, 5500);
        this.spider15 = new Spider(this, 14100, 5500);
        this.spider16 = new Spider(this, 14500, 5100);
        //Zona4
        this.spider17 = new Spider(this, 15550, 5500);
        this.spider18 = new Spider(this, 16250, 5300);
        this.spider19 = new Spider(this, 17050, 5300);
        this.spider20 = new Spider(this, 20050, 5300);
        this.spider21 = new Spider(this, 18050, 4800);
        this.spider22 = new Spider(this, 21000, 4400);
        this.wolf17 = new Wolf(this,18400, 4800);
        this.wolf18 = new Wolf(this,17600, 5100);
        this.wolf19 = new Wolf(this,18500, 5400);
        this.wolf20 = new Wolf(this,20600, 5500);
        this.wolf21 = new Wolf(this,19900, 4400);
        this.wolf22 = new Wolf(this,20300, 4400);
        this.wolf23 = new Wolf(this,19000, 3800);
        this.minotaur22 = new Minotaur(this, 19200, 4800);
        this.minotaur23 = new Minotaur(this, 20700, 4400);
        this.minotaur24 = new Minotaur(this, 18500, 4100);
        this.minotaur25 = new Minotaur(this, 19250, 3600);
        this.minotaur26 = new Minotaur(this,1800,5300);

        //this.player = new Player(this, 500, 1950);
        this.player = new Player(this,7694,1692);
        this.enemies.add(this.wolf1);
        this.enemies.add(this.wolf2);
        this.enemies.add(this.wolf3);
        this.enemies.add(this.wolf4);
        this.enemies.add(this.wolf5);
        this.enemies.add(this.wolf6);
        this.enemies.add(this.wolf7);
        this.enemies.add(this.wolf8);
        this.enemies.add(this.wolf9);
        this.enemies.add(this.wolf10);
        this.enemies.add(this.wolf11);
        this.enemies.add(this.wolf12);
        this.enemies.add(this.wolf13);
        this.enemies.add(this.wolf14);
        this.enemies.add(this.wolf15);
        this.enemies.add(this.wolf16);
        this.enemies.add(this.minotaur1);
        this.enemies.add(this.minotaur2);
        this.enemies.add(this.minotaur3);
        this.enemies.add(this.minotaur4);
        this.enemies.add(this.minotaur5);
        this.enemies.add(this.minotaur6);
        this.enemies.add(this.minotaur7);
        this.enemies.add(this.minotaur8);
        this.enemies.add(this.minotaur9);
        this.enemies.add(this.minotaur10);
        this.enemies.add(this.minotaur11);
        this.enemies.add(this.minotaur12);
        this.enemies.add(this.minotaur13);
        this.enemies.add(this.minotaur14);
        this.enemies.add(this.minotaur15);
        this.enemies.add(this.minotaur16);
        this.enemies.add(this.minotaur17);
        this.enemies.add(this.minotaur18);
        this.enemies.add(this.minotaur19);
        this.enemies.add(this.minotaur20);
        this.enemies.add(this.minotaur21);
        this.enemies.add(this.spider1);
        this.enemies.add(this.spider2);
        this.enemies.add(this.spider3);
        this.enemies.add(this.spider4);
        this.enemies.add(this.spider5);
        this.enemies.add(this.spider6);
        this.enemies.add(this.spider7);
        this.enemies.add(this.spider8);
        this.enemies.add(this.spider9);
        this.enemies.add(this.spider10);
        this.enemies.add(this.spider11);
        this.enemies.add(this.spider12);
        this.enemies.add(this.spider13);
        this.enemies.add(this.spider14);
        this.enemies.add(this.spider15);
        this.enemies.add(this.spider16);
        this.enemies.add(this.wolf17);
        this.enemies.add(this.wolf18);
        this.enemies.add(this.wolf19);
        this.enemies.add(this.wolf20);
        this.enemies.add(this.wolf21);
        this.enemies.add(this.wolf22);
        this.enemies.add(this.wolf23);
        this.enemies.add(this.spider17);
        this.enemies.add(this.spider18);
        this.enemies.add(this.spider19);
        this.enemies.add(this.spider20);
        this.enemies.add(this.spider21);
        this.enemies.add(this.spider22);
        this.enemies.add(this.minotaur22);
        this.enemies.add(this.minotaur23);
        this.enemies.add(this.minotaur24);
        this.enemies.add(this.minotaur25);
        this.enemies.add(this.minotaur26);


        this.bosses.add(this.boss1);
        this.bosses.add(this.boss2);
        this.bosses.add(this.boss3);
        //this.bosses.add(finalBoss);

        this.restZone1 = new restZone(this, 6430, 1700);
        this.restZone2 = new restZone(this,2398,4350);
        this.restZone3 = new restZone(this,14340,4650);
        this.restZone4 = new restZone(this,10500,4200);
        this.restZone5 = new restZone(this,18370,1300);
        this.restZone6 = new restZone(this,21485,5650);
        this.restZones.add(this.restZone1);
        this.restZones.add(this.restZone2);
        this.restZones.add(this.restZone3);
        this.restZones.add(this.restZone4);
        this.restZones.add(this.restZone5);
        this.restZones.add(this.restZone6);

        this.physics.world.setBounds(0, -13870, 23566, 23000); // Cambiar los valores según sea necesario

        // Establecer los límites de desplazamiento de la cámara
        this.cameras.main.setBounds(0, -13870, 23500, 22800); // Casi coincidir con el tamaño del mundo del juego
    

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
        this.physics.add.collider(this.bosses, this.groundLayer);
        this.physics.add.collider(this.player, this.wallLayer);
        this.physics.add.collider(this.enemies, this.wallLayer);
        this.physics.add.collider(this.bosses, this.wallLayer);
        this.physics.add.collider(this.restZones, this.groundLayer);

        this.zone1Change1 = this.add.zone(8140,1680,50,200);
        this.zone2Change1 = this.add.zone(8220, 1680,100,200);
        this.zone3Change1 = this.add.zone(10650, 2144,100,200);
        this.zone3Change2 = this.add.zone(9365,5723,100,200);
        this.zone2Change2 = this.add.zone(13460, 4603,100,200);
        this.zone1Change2 = this.add.zone(9235,5723,50,20);
        this.zone4Change = this.add.zone(15070,5723,100,200);
        this.grupo1 = this.add.group();
        this.grupo2 = this.add.group();
        this.grupo3 = this.add.group();
        this.grupo4 = this.add.group();
        this.grupo1.add(this.zone2Change1);
        this.grupo1.add(this.zone2Change2);
        this.grupo2.add(this.zone3Change1);
        this.grupo2.add(this.zone3Change2);
        this.grupo3.add(this.zone4Change);
        this.grupo4.add(this.zone1Change1);
        this.grupo4.add(this.zone1Change2);
        this.physics.add.existing(this.zone2Change1);
        this.physics.add.existing(this.zone3Change1);
        this.physics.add.existing(this.zone3Change2);
        this.physics.add.existing(this.zone2Change2);
        this.physics.add.existing(this.zone4Change);
        this.physics.add.existing(this.zone1Change1);
        this.physics.add.existing(this.zone1Change2);
        this.zone2Change1.body.setAllowGravity(false);
        this.zone3Change1.body.setAllowGravity(false);
        this.zone3Change2.body.setAllowGravity(false);
        this.zone2Change2.body.setAllowGravity(false);
        this.zone4Change.body.setAllowGravity(false);
        this.zone1Change1.body.setAllowGravity(false);
        this.zone1Change2.body.setAllowGravity(false);

        this.currentZone = "";            
        this.zone2Change1.setOrigin(0);
        this.physics.add.overlap(this.player, this.zone2Change1, () => {
            if(this.currentZone != "zona2"){
                this.mountain_sky.addToDisplayList();
                this.mountain1.addToDisplayList();
                this.mountain2.addToDisplayList();
                //this.mountain.addToDisplayList();
                this.fondo_clouds.removeFromDisplayList();
                this.fondo_sky.removeFromDisplayList();
                this.fondo_grounds.removeFromDisplayList();
                this.mountain_sky.setDepth(0);
                this.mountain1.setDepth(0);
                this.mountain2.setDepth(0);
                //this.mountain.setDepth(0);
                this.currentZone = "zona2";

                this.currentSong.stop();
                this.currentSong = this.zona3_backgroundMusic;
                this.currentSong.play();
            }
           
      
        });

       /* this.zone1Change1.setOrigin(0);
        this.physics.add.overlap(this.player, this.zone1Change1, () => {
            if(this.currentZone != "zona1"){
                this.fondo_clouds.addToDisplayList();
                this.fondo_sky.addToDisplayList();
                this.fondo_grounds.addToDisplayList();
                this.mountain_sky.removeFromDisplayList();
                this.mountain1.removeFromDisplayList();
                this.mountain2.removeFromDisplayList();
                this.fondo_clouds.setDepth(0);
                this.fondo_sky.setDepth(0);
                this.fondo_grounds.setDepth(0);
                this.currentZone = " zona1";

            }
      
        });*/
               
        /*zone3Change1.setOrigin(0);
        this.physics.add.overlap(this.player, this.zone3Change1, function() {
            if(this.currentZone != "zona3"){
                this.cave_background.addToDisplayList();
                this.cave2_background.addToDisplayList();
                this.cave3_background.addToDisplayList();
                this.cave4_background.addToDisplayList();
                this.mountain_sky.removeFromDisplayList();
                this.mountain1.removeFromDisplayList();
                this.mountain2.removeFromDisplayList();
                this.cave_background.setDepth(0);
                this.cave2_background.setDepth(0);
                this.cave3_background.setDepth(0);
                this.cave4_background.setDepth(0);

                this.currentZone = "zona3"
                this.currentSong.stop();
                this.currentSong = this.zona3_backgroundMusic;
                this.currentSong.play();
            }
        });
            
        zone3Change2.setOrigin(0);
        this.physics.add.overlap(this.player, this.zone3Change2, function() {
            if(this.currentZone != "zona3"){
                this.cave_background.addToDisplayList();
                this.cave2_background.addToDisplayList();
                this.cave3_background.addToDisplayList();
                this.cave4_background.addToDisplayList();
                this.fondo_clouds.removeFromDisplayList();
                this.fondo_sky.removeFromDisplayList();
                this.fondo_grounds.removeFromDisplayList();
                this.cave_background.setDepth(0);
                this.cave2_background.setDepth(0);
                this.cave3_background.setDepth(0);
                this.cave4_background.setDepth(0);

                this.currentZone = "zona3"
                this.currentSong.stop();
                this.currentSong = this.zona3_backgroundMusic;
                this.currentSong.play();
            }
        });
     
        zone2Change2.setOrigin(0);
        this.physics.add.overlap(this.player, this.zone2Change2, function() {
            if(this.currentZone != "zona2"){
                this.mountain_sky.addToDisplayList();
                this.mountain1.addToDisplayList();
                this.mountain2.addToDisplayList();
                this.cave_background.removeFromDisplayList();
                this.cave2_background.removeFromDisplayList();
                this.cave3_background.removeFromDisplayList();
                this.cave4_background.removeFromDisplayList();

                this.currentSong.stop();
                this.currentSong = this.musica_ambiente;
                this.currentSong.play();
            }
        });

        zone1Change2.setOrigin(0);
        this.physics.add.overlap(this.player, this.zone1Change2, function() {
            if(this.currentZone != "zona1"){
                this.fondo_clouds.addToDisplayList();
                this.fondo_sky.addToDisplayList();
                this.fondo_grounds.addToDisplayList();
                this.cave_background.removeFromDisplayList();
                this.cave2_background.removeFromDisplayList();
                this.cave3_background.removeFromDisplayList();
                this.cave4_background.removeFromDisplayList();

                this.currentZone = "zona1";
                this.currentSong.stop();
                this.currentSong = this.musica_ambiente;
                this.currentSong.play();
            }
        });
        
        zone4Change.setOrigin(0);
        this.physics.add.overlap(this.player, this.zone4Change, function() {
             if(this.currentZone != "zona4"){
                this.castle_background.addToDisplayList();
                this.fondo_clouds.removeFromDisplayList();
                this.fondo_sky.removeFromDisplayList();
                this.fondo_grounds.removeFromDisplayList();
                this.castle_background.setDepth(0);

                this.currentZone = "zona4";

                this.currentSong.stop();
                this.currentSong = this.zona4_backgroundMusic;
                this.currentSong.play();
            }
        });*/

        const config = {
            mute: false,
            volume: 0.10,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        };

        this.currentSong = "";
        this.musica_ambiente = this.sound.add("musica_ambiente", config);
        this.zona3_backgroundMusic = this.sound.add("zona3_background", config);
        this.zona4_backgroundMusic = this.sound.add("zona4_background", config);

        this.currentSong = this.musica_ambiente;
        this.currentSong.play();

        

    }

    /*
    enemiesRespawn(){
        this.time.delayedCall(4000, () => {
            this.children.respawn();
        }, [], this);
    }*/

    playerDeath() {
        this.time.delayedCall(4000, () => {
            this.player.respawn();
        }, [], this);
    }
    

    update(){
        /*
        if(this.currentZone == "zona2"){
            this.mountain1.tilePositionX = this.playerCamera.scrollX * 0.1;
            this.mountain_sky.tilePositionX = this.playerCamera.scrollX * 0.05;
            this.mountain2.tilePositionX = this.playerCamera.scrollX * 0.2;
        }
        else if(this.currentZone == "zona3"){

        }
        else if(this.currentZone == "zona4"){}
        else{
            this.fondo_clouds.tilePositionX = this.playerCamera.scrollX * 0.1;
            this.fondo_sky.tilePositionX = this.playerCamera.scrollX * 0.05;
            this.fondo_grounds.tilePositionX = this.playerCamera.scrollX * 0.2;
        }*/
    }

    pause_function(){
        this.scene.launch('pause',{collectible_list: this.collectible_list});
        this.scene.pause();
    }
    
}
