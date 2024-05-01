import Phaser from "phaser";

export default class informationScene2 extends Phaser.Scene {
    constructor() {
        super({ key: "informationScene2" });
    }

    create() {
        //Screen for topic information
        this.add.image(500, 300, "kitchen2");
        //Add text information
        this.add.text(100, 100, "Some Algorithms", {
            font: "bold 60px Arial",
            color: "#000000",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
        });

        const paragraph3 =
            "First-Come, First-Served (FCFS) - Processes I/O requests in order they arrive.";
        const paragraph4 =
            "Shortest Seek Time First (SSTF) - Chooses request closest to current head position.";
        const paragraph5 =
            "SCAN (Elevator) - Starts from one end of disk and moves toward the other. Services Requests along the way, then reverses direction";

        this.add.text(100, 210, paragraph3, {
            font: "30px Arial",
            color: "#000000",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            wordWrap: { width: 800 },
        });

        this.add.text(100, 330, paragraph4, {
            font: "30px Arial",
            color: "#000000",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            wordWrap: { width: 800 },
        });

        this.add.text(100, 450, paragraph5, {
            font: "30px Arial",
            color: "#000000",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            wordWrap: { width: 800 },
        });

        let nextButton2 = this.add
            .text(950, 550, "Next", {
                font: "50px Arial",
                color: "#ffffff",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
            })
            .setInteractive();

        let backButton = this.add
            .text(100, 550, "Back", {
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
