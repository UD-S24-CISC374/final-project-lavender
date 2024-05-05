import Phaser from "phaser";
import Result, { RESULT_DEFAULT } from "../objects/results";

export default class EndScore extends Phaser.Scene {
    private result: Result;

    constructor() {
        super({ key: "EndScore" });
        this.result = RESULT_DEFAULT;
    }

    init(data: Result) {
        this.result = data;
    }

    create() {
        //this.result = RESULT_DEFAULT;
        //Background & Logo Image
        this.add
            .image(
                this.cameras.main.displayWidth * 0.5 + 300,
                this.cameras.main.displayHeight * 0.5,
                "title_bg"
            )
            .setScale(1.4);

        this.add
            .text(
                this.cameras.main.displayWidth * 0.5,
                this.cameras.main.displayHeight * 0.5,
                `Dishes Made: ${this.result.dishes_made}
                \nMoney Made: ${this.result.money_made}`,
                {
                    font: "bold 16px Bangers",
                    color: "#355E3B",
                }
            )
            .setOrigin(0.5);

        //Play Button
        const play_btn = this.add.image(
            this.cameras.main.width * (1 / 2),
            this.cameras.main.height * (4 / 5),
            "play_bttn"
        );
        play_btn
            .setInteractive()
            .on("pointerdown", () => this.scene.start("LevelSelect"))
            .on("pointerover", () => play_btn.setScale(1.1))
            .on("pointerout", () => play_btn.setScale(1));
    }
}
