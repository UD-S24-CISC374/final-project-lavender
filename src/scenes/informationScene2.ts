import Phaser from "phaser";

export default class informationScene2 extends Phaser.Scene {
    constructor() {
        super({ key: "informationScene2" });
    }

    private buttonSound: Phaser.Sound.BaseSound;

    create() {
        this.buttonSound = this.sound.add("buttonSound");
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

        // Button dimensions and positions
        const tutorialButtonX = 950; // Right side
        const backButtonX = 100; // Left side
        const buttonY = 550;
        const buttonWidth = 150;
        const buttonHeight = 50;
        const cornerRadius = 25;

        // Tutorial button graphics
        const tutorialButtonGraphics = this.add.graphics();
        tutorialButtonGraphics.fillStyle(0xadd8e6, 0.8); // Blue fill
        tutorialButtonGraphics.fillRoundedRect(
            tutorialButtonX,
            buttonY,
            buttonWidth,
            buttonHeight,
            cornerRadius
        );
        tutorialButtonGraphics.lineStyle(2, 0xffffff, 1); // White outline
        tutorialButtonGraphics.strokeRoundedRect(
            tutorialButtonX,
            buttonY,
            buttonWidth,
            buttonHeight,
            cornerRadius
        );

        // Back button graphics
        const backButtonGraphics = this.add.graphics();
        backButtonGraphics.fillStyle(0xadd8e6, 0.8); // Blue fill
        backButtonGraphics.fillRoundedRect(
            backButtonX,
            buttonY,
            buttonWidth,
            buttonHeight,
            cornerRadius
        );
        backButtonGraphics.lineStyle(2, 0xffffff, 1); // White outline
        backButtonGraphics.strokeRoundedRect(
            backButtonX,
            buttonY,
            buttonWidth,
            buttonHeight,
            cornerRadius
        );

        // Tutorial button
        let nextButton2 = this.add
            .text(
                tutorialButtonX + buttonWidth / 2,
                buttonY + buttonHeight / 2,
                "Tutorial",
                {
                    font: "40px Bangers",
                    color: "#ffffff",
                }
            )
            .setOrigin(0.5, 0.5)
            .setInteractive();

        // Back button
        let backButton = this.add
            .text(
                backButtonX + buttonWidth / 2,
                buttonY + buttonHeight / 2,
                "Back",
                {
                    font: "40px Bangers",
                    color: "#ffffff",
                }
            )
            .setOrigin(0.5, 0.5)
            .setInteractive();

        // Button click events
        nextButton2.on("pointerdown", () => {
            this.buttonSound.play();
            this.scene.start("Tutorial");
        });
        backButton.on("pointerdown", () => {
            this.buttonSound.play();
            this.scene.start("informationScene");
        });

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
