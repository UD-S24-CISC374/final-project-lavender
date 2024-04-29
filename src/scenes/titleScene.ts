import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: "TitleScene" });
    }

    create() {
        //Add music
        const music = this.sound.add("backgroundMusic", { volume: 0.5 });
        music.play({ loop: true });

        //Background & Logo Image
        this.add.image(
            this.cameras.main.displayWidth * 0.5,
            this.cameras.main.displayHeight * 0.5,
            "title_bg"
        );
        this.add.image(
            this.cameras.main.displayWidth * (1 / 2),
            this.cameras.main.displayHeight * (1.2 / 4),
            "title_logo"
        );

        //Play Button
        const play_btn = this.add.image(
            this.cameras.main.width * (1 / 2),
            550,
            "play_bttn"
        );
        play_btn
            .setInteractive()
            .on("pointerdown", () => this.scene.start("LevelSelect"))
            .on("pointerover", () => play_btn.setScale(1.1))
            .on("pointerout", () => play_btn.setScale(1));
    }
}
