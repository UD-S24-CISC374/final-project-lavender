import Phaser from "phaser";

export default class informationScene extends Phaser.Scene {
    constructor() {
        super({ key: "informationScene" });
    }

    create() {
        //Screen for topic information
        this.add.image(640, 280, "kitchen1");
        //Add text information
        this.add.text(100, 100, "What is I/O Scheduling?", {
            font: "bold 60px Bangers",
            color: "#000000",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
        });

        const paragraph =
            "I/O, input-output, scheduling ensures that time spent on operations is used efficiently and is minimized. This assures for increased processing speed, better system responsiveness, and better throughput.";

        const paragraph2 =
            "Algorithms help to manage challenges such as different size priorities, read and write operations, and characteristics of the storage device like time taken for operations.";

        this.add.text(100, 210, paragraph, {
            font: "30px Bangers",
            color: "#000000",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            wordWrap: { width: 900 },
        });

        this.add.text(100, 380, paragraph2, {
            font: "30px Bangers",
            color: "#000000",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            wordWrap: { width: 900 },
        });

        let nextButton = this.add
            .text(950, 550, "Next", {
                font: "40px Bangers",
                color: "#ffffff",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
            })
            .setInteractive();

        // set cursor on hover
        nextButton.on("pointerover", () => {
            this.game.canvas.style.cursor = `url('assets/img/title_assets/arrow.png'), pointer`;
        });

        nextButton.on("pointerout", () => {
            this.game.canvas.style.cursor = "default";
        });

        //Button clck event
        nextButton.on("pointerdown", () => {
            // switch to next scene
            this.scene.start("informationScene2");
        });
    }
}
