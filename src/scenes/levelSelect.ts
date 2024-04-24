import Phaser from "phaser";

export default class LevelSelect extends Phaser.Scene {
    constructor() {
        super({ key: "LevelSelect" });
    }

    create() {
        //Background
        const background = this.add.image(
            this.cameras.main.displayWidth * 0.5,
            this.cameras.main.displayHeight * 0.5,
            "title_bg"
        );
        background.setFlipX(true);

        //Add buttons
        const tutorial_btn = this.add.image(
            this.cameras.main.width * (1 / 4),
            this.cameras.main.height * (1 / 4),
            "tutorial_btn"
        );
        tutorial_btn
            .setInteractive()
            .on("pointerdown", () => this.scene.start("informationScene"))
            .on("pointerover", () => tutorial_btn.setScale(1.1))
            .on("pointerout", () => tutorial_btn.setScale(1));

        const day1_btn = this.add.image(
            this.cameras.main.width * (3 / 4),
            this.cameras.main.height * (1 / 4),
            "day1_btn"
        );
        day1_btn
            .setInteractive()
            .on("pointerdown", () => this.scene.start("game_2"))
            .on("pointerover", () => day1_btn.setScale(1.1))
            .on("pointerout", () => day1_btn.setScale(1));

        const day2_btn = this.add.image(
            this.cameras.main.width * (1 / 4),
            this.cameras.main.height * (3 / 4),
            "day2_btn"
        );
        day2_btn
            .setInteractive()
            .on("pointerover", () => day2_btn.setScale(1.1))
            .on("pointerout", () => day2_btn.setScale(1));

        const day3_btn = this.add.image(
            this.cameras.main.width * (3 / 4),
            this.cameras.main.height * (3 / 4),
            "day3_btn"
        );
        day3_btn
            .setInteractive()
            .on("pointerover", () => day3_btn.setScale(1.1))
            .on("pointerout", () => day3_btn.setScale(1));
    }
}
