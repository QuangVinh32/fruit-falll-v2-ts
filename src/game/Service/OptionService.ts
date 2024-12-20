import OptionDTO from "../DTOs/OptionDTO";
import OptionView from "../View/OptionView";
import OptionController from "../Controllers/OptionController";

export default class OptionService {
    private scene: Phaser.Scene;
    private jsonPath: string;
    private controller: OptionController;
    private optionViews: OptionView[] = [];

    constructor(scene: Phaser.Scene, jsonPath: string) {
        this.scene = scene;
        this.jsonPath = jsonPath;
        this.controller = new OptionController();
    }

    private async loadData(): Promise<any> {
        const response = await fetch(this.jsonPath);
        return await response.json();
    }

    private mapOptions(data: any): OptionDTO[] {
        const options = Array.isArray(data.options) ? data.options : [];
        if (!options.length) console.error("Invalid or missing options data:", data.options);

        return options.map((optionData: any) => new OptionDTO(
            optionData.optionId,
            optionData.isAnswer,
            optionData.value,
            optionData.questionId,
            optionData.positionX,
            optionData.positionY,
            optionData.width,
            optionData.height
        ));
    }

    async initialize(questionId: number): Promise<void> {
        const data = await this.loadData();
        const options = this.mapOptions(data);

        options.forEach(option => this.controller.addOptions(option));

        const levelOptions = options.filter(option => option.questionId === questionId);
        if (levelOptions.length === 0) {
            console.warn(`No options found for questionId: ${questionId}`);
        } else {
            levelOptions.forEach(option => this.createOptionView(option));
        }
    }

    createOptionView(optionData: OptionDTO): void {
        const optionView = new OptionView(this.scene, optionData);
        this.optionViews.push(optionView);
    }

    getAllOptionViews(): OptionView[] {
        return this.optionViews;
    }

    getOptionViewById(optionId: number): OptionView | undefined {
        return this.optionViews.find(view => view.optionData.optionId === optionId);
    }

    getOptionDTOById(optionId: number): OptionDTO | undefined {
        return this.controller.getOptionById(optionId);
    }

    getAllOptionDTOs(): OptionDTO[] {
        return this.controller.getAllOptions();
    }
}
