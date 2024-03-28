import Phaser from 'phaser'


import player from '../assets/sprites/Viking/Viking-Sheet.png'
import wolf_stand from '../assets/sprites/Wolf/Black_Werewolf/Idle.png'
import wolf_walk from '../assets/sprites/Wolf/Black_Werewolf/walk.png'
import wolf_dead from '../assets/sprites/Wolf/Black_Werewolf/Dead.png'
import wolf_attack from '../assets/sprites/Wolf/Black_Werewolf/Attack_1.png'
import fox from '../assets/sprites/fox-sword.png'

import background from '../assets/sprites/Forest_of_Illusion_Files/Layers/back.png'
import castle_background from '../assets/sprites/Old-dark-Castle-tileset-Files/PNG/old-dark-castle-interior-background.png'
import pantalla_completa from '../assets/sprites/pantalla_completa.png'
import healthbar from '../assets/sprites/healthbar.png'
import relleno_healthbar from '../assets/sprites/relleno_healthbar.png'
import mapa from '../assets/map/mapa.json'
import tileset from '../assets/sprites/Environment/PNG/tileset.png'
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
      this.load.tilemapTiledJSON('tilemap', mapa);
      this.load.image('background', background);
      this.load.image('castle_background',castle_background);
      this.load.image('healthbar', healthbar);
      this.load.image('relleno_healthbar', relleno_healthbar);
      this.load.image('pantalla_completa', pantalla_completa);
      this.load.image('mainMap', tileset);
      
      this.load.spritesheet('player', player,{
        frameWidth: 115, frameHeight: 84 
      });
      this.load.spritesheet('wolf_stand', wolf_stand,{
        frameWidth: 128, frameHeight: 128 
      });
      this.load.spritesheet('wolf_walk', wolf_walk,{
        frameWidth: 128, frameHeight: 128 
      });
      this.load.spritesheet('wolf_dead', wolf_dead,{
        frameWidth: 128, frameHeight: 128 
      });
      this.load.spritesheet('wolf_attack', wolf_attack,{
        frameWidth: 128, frameHeight: 128 
      });
      this.load.spritesheet('fox', fox,{
        frameWidth:84, frameHeight: 128
      })
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
        frameRate: 8,
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
        frames: this.anims.generateFrameNumbers('player', {start: 78, end: 79}),
        frameRate: 3,
        repeat: 0
      });

      this.anims.create({
        key: 'dash',
        frames: this.anims.generateFrameNumbers('player', {start: 299, end: 303}),
        frameRate: 8,
        repeat: -1
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

      this.anims.create({
        key: 'wolf_dead',
        frames: this.anims.generateFrameNumbers('wolf_dead', { start: 0, end: 1 }), // Ajusta 'inicio' y 'fin' según los frames de tu animación
        frameRate: 2, // Ajusta 'velocidad' con la velocidad de reproducción de tu animación
        repeat: 0  // para no repetir la animación continuamente
      });
      
      this.anims.create({
        key: 'wolf_attack',
        frames: this.anims.generateFrameNumbers('wolf_attack', { start: 0, end: 5 }), // Ajusta 'inicio' y 'fin' según los frames de tu animación
        frameRate: 6, // Ajusta 'velocidad' con la velocidad de reproducción de tu animación
        repeat: 0  // para no repetir la animación continuamente
      });

      this.anims.create({
        key: 'fox_walk',
        frames: this.anims.generateFrameNumbers('fox', { start: 0, end: 7 }), // Ajusta 'inicio' y 'fin' según los frames de tu animación
        frameRate: 8, // Ajusta 'velocidad' con la velocidad de reproducción de tu animación
        repeat: -1  // para no repetir la animación continuamente
      });

      this.anims.create({
        key: 'fox_stand',
        frames: this.anims.generateFrameNumbers('fox', { start: 6, end: 7 }), // Ajusta 'inicio' y 'fin' según los frames de tu animación
        frameRate: 3, // Ajusta 'velocidad' con la velocidad de reproducción de tu animación
        repeat: -1  // para no repetir la animación continuamente
      });
    }
    
  }