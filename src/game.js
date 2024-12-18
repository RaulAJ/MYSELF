import Boot from './boot.js';
import End from './end.js';
import Level from './level.js';
import Pause from './pause.js';
import Phaser from 'phaser'

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    //width: 1000,
    //height: 500,
    scale: {
        mode: Phaser.Scale.FIT,  
        width: 1000,
        height: 562.5,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, Level, Pause, End],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: false
        }
    }
};

new Phaser.Game(config);
