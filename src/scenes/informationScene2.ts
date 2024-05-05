import Phaser from "phaser";

export default class informationScene2 extends Phaser.Scene {
    constructor() {
        super({ key: "informationScene2" });
    }

    create() {
        // Screen for topic information
        this.add.image(500, 300, "kitchen1");

        // Add text information
        this.add.text(100, 100, "Algorithms You Will See In Your Kitchen", {
            font: "bold 50px Bangers",
            color: "#000000",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
        });

        // Combined paragraph content
        const combinedParagraph =
            "First-Come, First-Served (FCFS) - Processes I/O requests in order they arrive :)\n" +
            "Priority Scheduling - Most important process must be done first!\n" +
            "Shortest Job First (SJF) - Waiting process with the smallest execution time goes first!";

        // Add combined text
        this.add.text(100, 210, combinedParagraph, {
            font: "35px Bangers",
            color: "#000000",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            wordWrap: { width: 900 },
        });

        // Next and back buttons with interactive handlers
        let nextButton2 = this.add
            .text(950, 550, "Tutorial", {
                font: "40px Bangers",
                color: "#ffffff",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
            })
            .setInteractive();

        let backButton = this.add
            .text(100, 550, "Back", {
                font: "40px Bangers",
                color: "#ffffff",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
            })
            .setInteractive();

        // Button click events
        nextButton2.on("pointerdown", () => this.scene.start("Tutorial"));
        backButton.on("pointerdown", () =>
            this.scene.start("informationScene")
        );

        // Cursor change on hover
        backButton.on(
            "pointerover",
            () => (this.game.canvas.style.cursor = "pointer")
        );
        backButton.on(
            "pointerout",
            () => (this.game.canvas.style.cursor = "default")
        );
        nextButton2.on(
            "pointerover",
            () => (this.game.canvas.style.cursor = "pointer")
        );
        nextButton2.on(
            "pointerout",
            () => (this.game.canvas.style.cursor = "default")
        );
    }
}
