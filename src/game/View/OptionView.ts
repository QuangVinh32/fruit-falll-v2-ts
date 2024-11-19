import OpitionDTO from "../DTOs/OptionDTO";

export default class OptionView extends Phaser.GameObjects.Container {
    public scene: Phaser.Scene;
    public optionData: OpitionDTO;
    private buttonOption: Phaser.GameObjects.Image;
    private textQuestion: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, optionData: OpitionDTO) {
        super(scene, optionData.positionX, optionData.positionY); // Set vị trí của Container
        this.scene = scene;
        this.optionData = optionData;

        this.scene.add.existing(this); // Thêm container vào scene
        this.createQuestion();
    }

    private createQuestion(): void {
        // Tạo button
        this.buttonOption = this.scene.add.image(0, 0, "button") // Set button ở vị trí (0,0) trong Container
            .setDisplaySize(this.optionData.width, this.optionData.height)
            .setOrigin(0.5, 0.5)
            .setInteractive();

        // Tạo text
        this.textQuestion = this.scene.add.text(0, 0, "5", {
            fontSize: '35px',
            color: 'black',
            fontStyle: "bold"
        })
            .setOrigin(0.5, 0.5); // Đảm bảo text nằm ở trung tâm của Container

        // Thêm button và text vào Container
        this.add(this.buttonOption);
        this.add(this.textQuestion);
    }
}
