import Phaser from "phaser";

export default class EndScore extends Phaser.Scene {
    constructor() {
        super({ key: "EndScore" });
    }

    create() {
        //Background & Logo Image
        this.add
            .image(
                this.cameras.main.displayWidth * 0.5 + 300,
                this.cameras.main.displayHeight * 0.5,
                "title_bg"
            )
            .setScale(1.4);

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
