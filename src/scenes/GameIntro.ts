import Phaser from "phaser";

export default class GameIntro extends Phaser.Scene {
    private content =
        "Chef, thank heavens you're here, where have you been?! We've been swamped with orders and we have six reservations coming in the next hour.";
    private dialogText?: Phaser.GameObjects.Text;
    private index = 0;
    private timerEvent?: Phaser.Time.TimerEvent;

    constructor() {
        super({ key: "GameIntro" });
    }

    create() {
        this.createDialogBox();
    }

    private createDialogBox(): void {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Create the rectangle for the dialog box
        const dialogBox = this.add.rectangle(
            width / 2,
            height / 2,
            width * 0.8,
            height * 0.8,
            0x888888
        );
        dialogBox.setFillStyle(0x888888, 0.5); // Gray color with 50% opacity

        // Create the text object with initial empty text
        this.dialogText = this.add
            .text(width / 2, height / 2, "", {
                font: "18px Arial",
                color: "#ffffff",
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
