import Phaser from "phaser";

export default class GameIntro extends Phaser.Scene {
    private content =
        "Chef, thank goodness you're here, we have a ton of orders coming in, people are loving this week's recipes! The Blueberry French Toast has been a fan favorite, but in my opinion the banana bread is waaaaay better...and easier to bake :) Anywaaaaay, ready to go?";
    private dialogText?: Phaser.GameObjects.Text;
    private index = 0;
    private timerEvent?: Phaser.Time.TimerEvent;
    

    constructor() {
        super({ key: "GameIntro" });
    }

    create() {
        this.cameras.main.setBackgroundColor("#add8e6");
        this.createDialogBox();

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

        let nextButton2 = this.add
            .text(
                tutorialButtonX + buttonWidth / 2,
                buttonY + buttonHeight / 2,
                "Continue",
                {
                    font: "35px Bangers",
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
                    font: "35px Bangers",
                    color: "#ffffff",
                }
            )
            .setOrigin(0.5, 0.5)
            .setInteractive();

        // Button click events
        nextButton2.on("pointerdown", () => this.scene.start("Day_1"));
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

    private createDialogBox(): void {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Create the rectangle for the dialog box
        const dialogBox = this.add.rectangle(
            width / 2,
            height / 2,
            width * 0.75,
            height * 0.75,
            0x888888
        );
        dialogBox.setFillStyle(0x888888, 0.5); // Gray color with 50% opacity

        // Create  text object with initial empty text
        this.dialogText = this.add
            .text(width / 2, height / 2, "", {
                font: "28px Arial",
                color: "#ffffff",
                lineSpacing: 10,
                wordWrap: { width: width * 0.7 }, // Wrapping width
            })
            .setOrigin(0.5); // Center the text within the dialog box

        this.startTypewriterEffect();
    }

    private startTypewriterEffect(): void {
        const speed = 50; // Speed of the typewriter effect (milliseconds)
        this.timerEvent = this.time.addEvent({
            delay: speed,
            repeat: this.content.length - 1,
            callback: () => {
                this.typeNextChar();
            },
            callbackScope: this,
        });
    }

    private typeNextChar(): void {
        if (!this.dialogText || this.index >= this.content.length) {
            this.timerEvent?.remove();
            return;
        }
        this.dialogText.text += this.content[this.index];
        this.index++;
    }
}
