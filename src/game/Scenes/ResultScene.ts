import FruitService from "../Service/FruitService";
import OptionService from "../Service/OptionService";
import QuestionService from "../Service/QuestionService";

export default class ResultScene extends Phaser.Scene {
    private fruitService: FruitService | null = null;
    private questionService: QuestionService | null = null;
    private optionService: OptionService | null = null;
    private levelId: number;
    private fruitId: number;
    private questionId: number;
    private fruitsCaught: { levelId: number, fruitId: number }[] = [];

    constructor() {
        super("ResultScene");
        // this.levelId = 1;
    }

    init(data: { score: number, levelId : number, fruitsCaught: { levelId: number, fruitId: number }[] }) {
        this.levelId = data.levelId;
        this.fruitsCaught = data.fruitsCaught || [];
        console.log('Fruits caught:', this.fruitsCaught);
        console.log('levelId:', this.levelId);
    }

    async create() {

        // const validFruits = this.fruitsCaught.filter(fruit => fruit.fruitId !== 0);
        // const validFruitsCount = validFruits.length;
    
        // console.log('Số lượng trái cây hợp lệ (fruitId khác 0):', validFruitsCount);

        this.add.text(230, 15, "The Farmer's Fruit", { fontSize: '30px Arial', fontStyle: "bold", color: 'black' });

        const gridStartX = 50;
        const gridStartY = 80; 
        const cellWidth = 60; 
        const cellHeight = 60; 
        const rows = 5; 
        const cols = 10;

        const graphics = this.add.graphics();
        graphics.lineStyle(4, 0x000000, 1); // Đường viền màu đen, độ dày 4px
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = gridStartX + col * cellWidth;
                const y = gridStartY + row * cellHeight;
                graphics.strokeRect(x, y, cellWidth, cellHeight);
            }
        }
        // Thêm số ở phía trái (5, 4, 3, 2, 1)
        for (let row = 0; row < rows; row++) {
            const number = rows - row;
            this.add.text(
                gridStartX - 25, 
                gridStartY + row * cellHeight + cellHeight / 2 - 10, 
                number.toString(), 
                { fontSize: '20px', color: 'black', fontStyle: "bold" }
            );
        }
        this.fruitService = new FruitService(this, "assets/Data/fruit.json");
        await this.fruitService.initializeByNoView(this.levelId,this.fruitId);

        for (let row = 0; row < this.fruitsCaught.length; row++) {
            const fruitData = this.fruitsCaught[row];
            this.fruitId = fruitData.fruitId;

            const fruitDTO = this.fruitService.getFruitDTOById(this.fruitId, this.levelId);
            if (fruitDTO) {
                const x = gridStartX + (this.levelId - 1) * cellWidth + cellWidth / 2;
                const y = gridStartY + row * cellHeight + cellHeight / 2;

                const fruitType = this.fruitService.getFruitTypeById(fruitDTO.fruitTypeId);
                if (fruitType) {
                    this.add.sprite(x, y, fruitType.texture)
                        .setOrigin(0.5, 0.5)
                        .setDisplaySize(fruitDTO.width, fruitDTO.height);
                }
            } else {
                console.warn(`Missing data for fruitId: ${this.fruitId}`);
            }
        }


        // Thêm tên trái cây dưới mỗi cột
        const fruitNames = [
            "Apples", "Pears", "Oranges", "Lemons", "Limes", 
            "Peaches", "Cherries", "Mangoes", "Kiwis", "Star Fruit"
        ];

        for (let col = 0; col < cols; col++) {
            this.add.text(
                gridStartX + col * cellWidth + cellWidth / 2 - 28, 
                gridStartY + rows * cellHeight + 10, 
                fruitNames[col % fruitNames.length], 
                { fontSize: '12px', color: 'black', fontStyle: "bold" }
            );
        }

        // this.add.text(150, 410, "How many did you catch?", { fontSize: '30px Arial', fontStyle: "bold", color: 'black' });
        this.add.text(180, 450, "Use the picture graph above to find the correct amount.", { fontSize: '15px Arial', color: 'black' });

        this.questionService = new QuestionService(this, "assets/Data/question.json");
        await this.questionService.initialize(this.levelId);

        const questionDTO = this.questionService.getQuestionDTOById(this.levelId);

        if (questionDTO && questionDTO.questionId !== undefined) {
            console.log(questionDTO);
            const questionId = questionDTO.questionId;
            this.optionService = new OptionService(this, "assets/Data/option.json");
            await this.optionService.initialize(questionId);
            const optionDTO = this.optionService.getOptionDTOById(questionId);
            console.log("op", optionDTO);
        } else {
            console.error("Không thể lấy questionDTO hoặc questionId không hợp lệ");
        }

        this.add.text(50, 30, "Next Level", { fontSize: '30px Arial', fontStyle: "bold", color: 'black' })
        .setInteractive() 
        .on('pointerdown', () => {
            this.levelId += 1;
    
            console.log("Transitioning to LevelScene with levelId:", this.levelId);
            this.scene.start('LevelScene', {
                levelId: this.levelId,
                fruitsCaught: this.fruitsCaught
            });
        });
    
    }

    update() {}
}
