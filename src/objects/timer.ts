import Phaser from "phaser";

interface TimerProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
    duration: number;
}

export class Timer extends Phaser.GameObjects.Text {
    //Create a M:SS timer that counts down.
    //Probably start from 3mins, and count down from there.
    //Reminder: countdownDuration is in seconds
    private countdown!: Phaser.Time.TimerEvent;
    private countdownDuration: number;
    private onComplete: () => void;

    constructor(config: TimerProps, onComplete: () => void) {
        super(config.scene, config.x, config.y, "", {
            fontSize: 60,
            color: "#ffffff",
            fontFamily: "Noto Sans",
        });
        this.countdownDuration = config.duration;
        this.onComplete = onComplete;
        this.setOrigin(0.5);
        this.startCountdown();
        config.scene.add.existing(this);
    }

    startCountdown() {
        this.countdown = this.scene.time.addEvent({
            delay: 1000, // Update every second
            callback: this.updateTimer,
            callbackScope: this,
            loop: true,
        });
    }

    updateTimer() {
        if (this.countdownDuration <= 0) {
            this.countdown.destroy();
            this.setText("00:00");
            this.onComplete();
        } else {
            const minutes = Math.floor(this.countdownDuration / 60);
            const seconds = this.countdownDuration % 60;
            const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
                seconds
            ).padStart(2, "0")}`;
            this.setText(formattedTime);
            this.countdownDuration -= 1;
        }
    }
}
