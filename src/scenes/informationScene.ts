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
            backgroundColor: "rgba(255, 255, 255, 0.8)",
        });

        const combinedParagraph =
            "- I/O, input-output, scheduling ensures that time spent on\n  operations is used efficiently and is minimized. This assures\n  for increased processing speed, better system responsiveness,\n  and better throughput\n- Algorithms help to manage challenges such as different size\n  priorities, read and write operations, and characteristics of the\n  storage device like time taken for operations.";

        // Add combined text
        this.add.text(100, 210, combinedParagraph, {
            font: "35px Bangers",
            color: "#000000",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            wordWrap: { width: 900 },
        });

        // Button dimensions and positions
        const tutorialButtonX = 950; // Right side
        const backButtonX = 100; // Left side
        const buttonY = 550;
        const buttonWidth = 120;
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
        tutorialButtonGraphics.lineStyle(2, 0xffffff, 1); 
        tutorialButtonGraphics.strokeRoundedRect(
            tutorialButtonX,
            buttonY,
            buttonWidth,
            buttonHeight,
            cornerRadius
        );

        // Back button graphics
        const backButtonGraphics = this.add.graphics();
        backButtonGraphics.fillStyle(0xadd8e6, 0.8); // Blue
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
                "Next",
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
        nextButton2.on("pointerdown", () => this.scene.start("informationScene2"));
        backButton.on("pointerdown", () =>
            this.scene.start("LevelSelect")
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
