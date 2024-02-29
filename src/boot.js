import Phaser from 'phaser'


import player from '../assets/sprites/Viking/Viking-Sheet.png'
import background from '../assets/sprites/Mountain-Dusk.png'
/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
    preload() {
      // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
      this.load.setPath('assets/sprites/');
      this.load.image('background', background);
      this.load.spritesheet('player', player,{
        frameWidth: 115, frameHeight: 84 
      });
    }

    /**
     * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
     * nivel del juego
     */
    create() {
      this.scene.start('level');
      this.anims.create({
        key: 'stand',
        frames: this.anims.generateFrameNumbers('player', {start: 0, end: 7}),
        frameRate: 3,
        repeat: -1
      });

      this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('player', {start: 26, end: 33 }),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('player', {start: 78, end: 80}),
        frameRate: 3,
        repeat: 0
      });

      this.anims.create({
        key: 'attack1',
        frames: this.anims.generateFrameNumbers('player', {start: 104, end: 107}),
        frameRate: 10,
        repeat: 0
      });

    }
    
  }