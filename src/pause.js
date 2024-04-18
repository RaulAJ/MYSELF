/**
 * @extends Phaser.Scene
 */
export default class Pause extends Phaser.Scene {

    //https://github.com/admont02/PVLI22-23_GRUPO01/blob/main/src/Scenes/level1.js#L210
    
    constructor() {
        super({ key: 'pause' });
    }

    init(data) {
        this.currentLevel = data.nivel;
    }
    
    create() {
        this.scene.bringToTop();
        // create a sprite
        this.pauseKey();
        // Create a dark background for the pause menu
        const bg = this.add.rectangle(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height, 0x000000, 0.5).setOrigin(0);

        var imagePresent = this.add.image(this.sys.game.canvas.width/2,320, 'pause');
        imagePresent.setScale(1.6);

        // Add text for the pause menu title
        const title = this.add.text(this.sys.game.canvas.width / 2, 50, 'PAUSED', { fontSize: '64px', color: '#ffffff' }).setOrigin(0.5);

        // Add a "Resume" button to return to the game
        const resumeButton = this.add.text(this.sys.game.canvas.width / 2, 215, 'Reanudar', { fontFamily: 'Times_New_Roman', fontSize: '42px', color: '#333333' }).setOrigin(0.5);
        resumeButton.setInteractive();
        resumeButton.on('pointerdown', () => {
            this.scene.resume('level');
            this.scene.stop();
        });

        // Add a "Quit" button to return to the main menu
        const quitButton = this.add.text(this.sys.game.canvas.width / 2, 280, 'Reiniciar', { fontFamily: 'Times_New_Roman', fontSize: '42px', color: '#333333' }).setOrigin(0.5);
        quitButton.setInteractive();
        quitButton.on('pointerdown', () => {
            this.scene.stop();
            this.scene.stop('level');
            setTimeout(function () {
                this.scene.start('boot');
            }.bind(this), 1000); // espera 1 segundos antes de cambiar de escena
        });
        
        

    }
    
    pauseKey() {
    
        this.input.keyboard.on('keydown-ESC', function (event) {

            this.scene.resume('level');
            this.scene.stop();

        }.bind(this));
    
    }

}