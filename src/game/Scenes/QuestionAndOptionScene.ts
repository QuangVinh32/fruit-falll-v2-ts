import FruitService from "../Service/FruitService";
import OptionService from "../Service/OptionService";
import QuestionService from "../Service/QuestionService";

export default class QuestionAndOptionScene extends Phaser.Scene{
    private fruitService: FruitService | null = null;
    private questionService: QuestionService | null = null;
    private optionService: OptionService | null = null;
    private levelId: number;
    private fruitId: number;
    private fruitsCaught: Map<number, { levelId: number, fruitId: number }[]> = new Map();
    private validFruitsCount: number;
    
    
    constructor(){
        super("QuestionAndOptionScene");
    }
    init(data: { score: number, levelId: number, fruitsCaught: { levelId: number, fruitId: number }[],validFruitsCount: number }) {
        this.levelId = data.levelId;
        this.validFruitsCount = data.validFruitsCount;

        data.fruitsCaught.forEach(fruit => {
            if (!this.fruitsCaught.has(fruit.levelId)) {
                this.fruitsCaught.set(fruit.levelId, []);
            }
            this.fruitsCaught.get(fruit.levelId)!.push(fruit);
        });

        console.log('Fruits caught (grouped by level):', this.fruitsCaught);
    }
    preaload(){

    }
    async create(){
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
            const optionDTO = this.optionService.getAllOptionDTOs();
            console.log("op", optionDTO);
        } else {
            console.error("Không thể lấy questionDTO hoặc questionId không hợp lệ");
        }

        this.add.text(510, 15, "Next Level", { fontSize: '30px Arial', fontStyle: "bold", color: 'black' })
        .setInteractive() 
        .on('pointerdown', () => {
            this.levelId += 1;
    
            console.log("Transitioning to LevelScene with levelId:", this.levelId);
            this.scene.start('LevelScene', {
                levelId: this.levelId,
            });
            this.scene.stop('QuestionAndOptionScene', {
            });
            this.scene.stop('ResultScene', {
            });
            
        });

    }
    update(){

    }
}