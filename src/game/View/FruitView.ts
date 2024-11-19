import FruitDTO from "../DTOs/FruitDTO"; 
import FruitTypeDTO from "../DTOs/FruitTypeDTO"; 

export default class FruitView extends Phaser.GameObjects.Container {
    public scene: Phaser.Scene;
    public fruitData: FruitDTO;
    private fruitType: FruitTypeDTO;
    private fruit: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene, fruitData: FruitDTO, fruitType: FruitTypeDTO) {
        super(scene);
        this.scene = scene;
        this.fruitData = fruitData;
        // Thêm Container này vào scene
        this.scene.add.existing(this);
        // Tạo vật lý cho Container
        this.scene.physics.world.enable(this);
        // Tạo sprite cho quả
        this.createFruit(fruitType);
        // Update
        this.updateContainerSize();
        // Đặt vị trí ban đầu
        this.setPosition(fruitData.positionX, fruitData.positionY);
    }

    createFruit(fruitType: FruitTypeDTO) {
        this.fruit = this.scene.physics.add.sprite(
            0,
            0,
            fruitType.texture
        )
        .setDisplaySize(this.fruitData.width, this.fruitData.height)
        .setOrigin(0.5, 0.5);
        this.add(this.fruit);
    }
    updateContainerSize() {
        this.setSize(this.fruit.displayWidth, this.fruit.displayHeight);
        const body = this.body as Phaser.Physics.Arcade.Body;
        if (body) {
            body.setSize(this.fruit.displayWidth, this.fruit.displayHeight);
        }
    }
}
