import Phaser from "phaser";

export default class GameIntro extends Phaser.Scene {
    constructor() {
        super({ key: "GameIntro" });
    }

    create() {
       

        let nextButton2 = this.add
            .text(1050, 625, "Next", {
                font: "50px Arial",
                color: "#ffffff",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
            })
            .setInteractive();

        let backButton = this.add
            .text(100, 625, "Back", {
                font: "50px Arial",
                color: "#ffffff",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
            })
            .setInteractive();

        //Button click event
        nextButton2.on("pointerdown", () => {
            // switch to next scene
            this.scene.start("GameIntro");
        });

        backButton.on("pointerdown", () => {
            // switch to previous scene
            this.scene.start("informationScene");
        });
    }
}
