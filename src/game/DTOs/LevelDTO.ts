export default class LevelDTO{
    private _levelId: number;
    private _score: number;
    private _time: Date;
    private _state: number;


	constructor(levelId: number, score: number, time: Date, state: number) {
		this._levelId = levelId;
		this._score = score;
		this._time = time;
		this._state = state;

	}

    /**
     * Getter levelId
     * @return {number}
     */
	public get levelId(): number {
		return this._levelId;
	}

    /**
     * Getter score
     * @return {number}
     */
	public get score(): number {
		return this._score;
	}

    /**
     * Getter time
     * @return {Date}
     */
	public get time(): Date {
		return this._time;
	}

    /**
     * Getter state
     * @return {number}
     */
	public get state(): number {
		return this._state;
	}

    /**
     * Setter levelId
     * @param {number} value
     */
	public set levelId(value: number) {
		this._levelId = value;
	}

    /**
     * Setter score
     * @param {number} value
     */
	public set score(value: number) {
		this._score = value;
	}

    /**
     * Setter time
     * @param {Date} value
     */
	public set time(value: Date) {
		this._time = value;
	}

    /**
     * Setter state
     * @param {number} value
     */
	public set state(value: number) {
		this._state = value;
	}




}