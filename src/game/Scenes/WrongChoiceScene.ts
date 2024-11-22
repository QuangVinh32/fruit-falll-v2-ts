export default class WrongChoiceScene extends Phaser.Scene{
    constructor(){
        super("WrongChoiceScene")
    }
    init(){

    }
    preaload(){

    }
    create(){
        this.add.text(240, 410, "Sorry , The answer is 3", { fontSize: '20px Arial', fontStyle: "bold", color: 'black' })
        this.add.text(230, 440, "Try agian, Select 'Start' to continue", { fontSize: '15px Arial', color: 'black' })

        let buttonStart = this.add.image(350, 530, 'button')
        .setDisplaySize(120, 120)
        .setOrigin(0.5, 0.5)
        .setInteractive();
        let startText = this.add.text(0, 0, 'Start', { fontSize: '25px Arial', fontStyle: 'bold', color: 'black' });
        startText.setOrigin(0.5, 0.5);
        startText.setPosition(buttonStart.x, buttonStart.y);

        buttonStart.on('pointerdown', () => {
            console.log("Quay lại màn chơi")
            this.scene.start("LevelScene");
        });


        

    }
    update(){

    }
}