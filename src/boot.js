import Phaser from 'phaser'


import player from '../assets/sprites/Viking/Viking-Sheet.png'
import wolf_stand from '../assets/sprites/Wolf/Black_Werewolf/Idle.png'
import wolf_walk from '../assets/sprites/Wolf/Black_Werewolf/walk.png'
import background from '../assets/sprites/Mountain-Dusk.png'
import crystal from '../assets/sprites/Estructuras/crystal.png'


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
      this.load.image('crystal', crystal);
      this.load.spritesheet('player', player,{
        frameWidth: 115, frameHeight: 84 
      });
      this.load.spritesheet('wolf_stand', wolf_stand,{
        frameWidth: 128, frameHeight: 128 
      });
      this.load.spritesheet('wolf_walk', wolf_walk,{
        frameWidth: 128, frameHeight: 128 
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
      
      this.anims.create({
        key: 'attack2',
        frames: this.anims.generateFrameNumbers('player', {start: 117, end: 120}),
        frameRate: 10,
        repeat: 0
      });

      this.anims.create({
        key: 'wolf_stand',
        frames: this.anims.generateFrameNumbers('wolf_stand', { start: 0, end: 7 }), // Ajusta 'inicio' y 'fin' según los frames de tu animación
        frameRate: 3, // Ajusta 'velocidad' con la velocidad de reproducción de tu animación
        repeat: -1 // -1 para repetir la animación continuamente
      });

      this.anims.create({
        key: 'wolf_walk',
        frames: this.anims.generateFrameNumbers('wolf_walk', { start: 0, end: 10 }), // Ajusta 'inicio' y 'fin' según los frames de tu animación
        frameRate: 8, // Ajusta 'velocidad' con la velocidad de reproducción de tu animación
        repeat: -1 // -1 para repetir la animación continuamente
      });

    }
    
  }