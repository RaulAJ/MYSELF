import Phaser from 'phaser'


import player from '../assets/sprites/Viking/Viking-Sheet.png'
import wolf_stand from '../assets/sprites/Wolf/Black_Werewolf/Idle.png'
import wolf_walk from '../assets/sprites/Wolf/Black_Werewolf/walk.png'
import wolf_dead from '../assets/sprites/Wolf/Black_Werewolf/Dead.png'
import wolf_attack from '../assets/sprites/Wolf/Black_Werewolf/Attack_1.png'
import wolf_hurt from '../assets/sprites/Wolf/Black_Werewolf/Hurt.png'

import logo_hormiga from '../assets/sprites/logo_hormiga.png'
import background from '../assets/sprites/Forest_of_Illusion_Files/Layers/back.png'
import castle_background from '../assets/sprites/Old-dark-Castle-tileset-Files/PNG/old-dark-castle-interior-background.png'
import pantalla_completa from '../assets/sprites/pantalla_completa.png'
import healthbar from '../assets/sprites/healthbar.png'
import relleno_healthbar from '../assets/sprites/relleno_healthbar.png'
import pause from '../assets/sprites/pause.png'
import mapa from '../assets/map/mapa.json'
import mapa2 from '../assets/map/mapa2.json'
import mapa3 from '../assets/map/mapa3.json'

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

      var silkscreen_font = new FontFace('Times_New_Roman', 'url(../assets/styles/Times-New-Roman-Subsetted.woff)');

      var progressBar = this.add.graphics();
      var progressBox = this.add.graphics();

      var width = this.sys.game.canvas.width;
      var height = this.sys.game.canvas.height;

      progressBox.fillStyle(0x2242a2, 0.5);
      progressBox.fillRect(width/2-150, 280, 300, 25);
      

      var loadingText = this.make.text({
          x: width / 2 - 32,
          y: height / 2 - 30,
          text: 'Cargando...',
          style: { fontFamily: 'Times_New_Roman', fontSize: '12px' }
      });
      
      var porcentaje = this.make.text({
          x: width / 2 - 25,
          y: height / 2 + 2,
          style: { fontFamily: 'Times_New_Roman', fontSize: '16px' }
      });
      
      var assetText = this.make.text({
          x: width / 2 - 148,
          y: height / 2 + 35,
          style: { fontFamily: 'Times_New_Roman', fontSize: '12px' }
      });
      
      this.load.on('progress', function (value) {
          progressBar.clear();
          porcentaje.setText(parseInt(value * 100) + '%');
          progressBar.fillStyle(0xffffff, 1);
          progressBar.fillRect(width/2-145, 285, 290 * value, 15);
      });
      
      this.load.on('fileprogress', function (file) {
          assetText.setText('Cargando asset: ' + file.key);
      });

      this.load.on('complete', function () {
          progressBar.destroy();
          progressBox.destroy();
          loadingText.destroy();
          porcentaje.destroy();
          assetText.destroy();
      });

      // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
      this.load.setPath('assets/sprites/');

      this.load.tilemapTiledJSON('tilemap', mapa);
      this.load.tilemapTiledJSON('tilemap2', mapa2);
      this.load.tilemapTiledJSON('tilemap3', mapa3);
      
      this.load.image('mainMap', tileset);
      
      this.load.image('logo_hormiga', logo_hormiga);
      this.load.image('background', background);
      this.load.image('pause', pause);
      this.load.image('castle_background',castle_background);
      this.load.image('healthbar', healthbar);
      this.load.image('relleno_healthbar', relleno_healthbar);
      this.load.image('pantalla_completa', pantalla_completa);
     
      
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
      this.load.spritesheet('wolf_hurt', wolf_hurt,{
        frameWidth: 128, frameHeight: 128 
      })      
}
    

    /**
     * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
     * nivel del juego
     */
    create() {
      
      // Crear un rectángulo blanco para el fondo
      const backgroundRect = this.add.rectangle(
          this.sys.game.canvas.width / 2,
          this.sys.game.canvas.height / 2,
          this.sys.game.canvas.width,
          this.sys.game.canvas.height,
          0x808080 // Color blanco en formato hexadecimal
      );

      // Asegurarse de que el fondo esté detrás de la imagen y el texto
      backgroundRect.setDepth(-1);
      let image = this.add.image(this.sys.game.canvas.width/2,this.sys.game.canvas.height/2, 'logo_hormiga');
      image.setAlpha(0); 
      image.setScale(0.5);

      let texto = this.add.text(500, 300, 'Una nueva aventura...', { fontFamily: 'Times_New_Roman', fontSize: '42px', fill: '#ffffff' });
      texto.setOrigin(0.5);
      texto.setVisible(false); 
      texto.setDepth(1); 

      let imagenTweens = this.tweens.add({
        targets: image,
        alpha: 1,
        duration: 2000, // duración de la animación en milisegundos
        ease: 'Linear', // tipo de interpolación de la animación
        yoyo: true, // hace que la animación se reproduzca en sentido inverso
        onComplete: () => {
            let textTweens = this.tweens.add({
                targets: texto,
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 2000, 
                ease: 'Linear', 
                yoyo: true, 
                onComplete: () => {
                  setTimeout(function () {
                    this.scene.start('level');
                }.bind(this), 2000); 
                    
              },
                onCompleteScope: this 
            });
            texto.setVisible(true); // cambia la visibilidad del texto a true
        },
        onCompleteScope: this // laanimación se agrega al objeto correcto
      });

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
        key: 'death',
        frames: this.anims.generateFrameNumbers('player', {start: 52, end: 64}),
        frameRate: 8,
        repeat: 0
      });

      this.anims.create({
        key: 'hurt',
        frames: this.anims.generateFrameNumbers('player', {start: 39, end: 42}),
        frameRate: 6,
        repeat: -1
      });
      
      this.anims.create({
        key: 'dash',
        frames: this.anims.generateFrameNumbers('player', {start: 286, end: 290}),
        frameRate: 8,
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

      this.anims.create({
        key: 'wolf_dead',
        frames: this.anims.generateFrameNumbers('wolf_dead', { start: 0, end: 1 }), // Ajusta 'inicio' y 'fin' según los frames de tu animación
        frameRate: 4, // Ajusta 'velocidad' con la velocidad de reproducción de tu animación
        repeat: 0  // para no repetir la animación continuamente
      });
      
      this.anims.create({
        key: 'wolf_attack',
        frames: this.anims.generateFrameNumbers('wolf_attack', { start: 0, end: 5 }), // Ajusta 'inicio' y 'fin' según los frames de tu animación
        frameRate: 6, // Ajusta 'velocidad' con la velocidad de reproducción de tu animación
        repeat: 0  // para no repetir la animación continuamente
      });

      this.anims.create({
        key: 'wolf_hurt',
        frames: this.anims.generateFrameNumbers('wolf_hurt', { start: 0, end: 1 }), // Ajusta 'inicio' y 'fin' según los frames de tu animación
        frameRate: 2, // Ajusta 'velocidad' con la velocidad de reproducción de tu animación
        repeat: -1  // para no repetir la animación continuamente
      });
      
    }
    
  }