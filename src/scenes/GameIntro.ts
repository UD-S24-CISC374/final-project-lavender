import Phaser from "phaser";

export default class GameIntro extends Phaser.Scene {
    private content =
        "Chef, thank goodness you're here, where have you been?! We've been swamped with orders and we have six reservations coming in the next hour. Sam called out so it's just you and me today, but we got this!";
    private dialogText?: Phaser.GameObjects.Text;
    private index = 0;
    private timerEvent?: Phaser.Time.TimerEvent;

    constructor() {
        super({ key: "GameIntro" });
    }

    create() {
        this.cameras.main.setBackgroundColor("#add8e6");
        this.createDialogBox();
        this.createNextButton();
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

    private createNextButton(): void {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const nextButton = this.add.rectangle(
            width - 100,
            height - 50,
            100,
            50
        );
        nextButton.setInteractive({ useHandCursor: true });
        nextButton.on("pointerdown", () => this.scene.start("Tutorial"));

        this.add
            .text(nextButton.x, nextButton.y, "Next", {
                font: "50px Arial",
                color: "#ffffff",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
            })
            .setOrigin(0.5);
    }
}
