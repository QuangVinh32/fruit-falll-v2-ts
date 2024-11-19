
        export default class PlayGameScene extends Phaser.Scene {
            constructor() {
                super("PlayGameScene");
            }
        
            preload() {
                this.load.image("button", "assets/Images/button.png");
            }
        
            create() {
                this.add.text(160, 380, 'Help the farmer catch the apples.', { fontSize: '25px Arial',fontStyle:"bold", color: 'black' });
                this.add.text(170, 420, 'Move your pointer to the left and right and he will follow.', { fontSize: '15px Arial', color: 'black' });
        
                let buttonStart = this.add.image(350, 300, 'button')
                .setDisplaySize(120, 120)
                .setOrigin(0.5, 0.5)
                .setInteractive();
            
                let startText = this.add.text(0, 0, 'Start', { fontSize: '25px Arial', fontStyle: 'bold', color: 'black' });
                
                startText.setOrigin(0.5, 0.5);
                startText.setPosition(buttonStart.x, buttonStart.y); 
                

        
                buttonStart.on('pointerdown', () => {
                    console.log("Start button clicked");
                    this.scene.launch('UIScene');
                    this.scene.get('LevelScene').events.emit('enablePlayerMove');
                    this.scene.get('LevelScene').events.emit('startFruitFall');                    
                    this.scene.stop('PlayGameScene');
                });
            }
        
            update() {}
        
        

    }