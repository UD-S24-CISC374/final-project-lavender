import Phaser from "phaser";
import { Player_Arms } from "./player_arms";

interface PlayerProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
    cursors: Phaser.Input.Keyboard.KeyboardPlugin | null;
}

export class Player extends Phaser.Physics.Arcade.Sprite {
    cursors: Phaser.Input.Keyboard.KeyboardPlugin | null;

    constructor(config: PlayerProps) {
        super(config.scene, config.x, config.y, "chef_player");
        this.cursors = config.scene.input.keyboard;
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this, false);
        this.setCollideWorldBounds(true);
    }

    createAnims() {
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("chef_player", {
                start: 0,
                end: 0,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "move",
            frames: this.anims.generateFrameNumbers("chef_player", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }

    movePlayer(arms: Player_Arms) {
        const speed = 300;
        const diagonalSpeed = speed / Math.sqrt(2);

        let W_Down = this.cursors?.addKey(
            Phaser.Input.Keyboard.KeyCodes.W
        ).isDown;
        let A_Down = this.cursors?.addKey(
            Phaser.Input.Keyboard.KeyCodes.A
        ).isDown;
        let S_Down = this.cursors?.addKey(
            Phaser.Input.Keyboard.KeyCodes.S
        ).isDown;
        let D_Down = this.cursors?.addKey(
            Phaser.Input.Keyboard.KeyCodes.D
        ).isDown;

        if (W_Down || A_Down || S_Down || D_Down) {
            if (W_Down && A_Down) {
                this.setVelocity(-diagonalSpeed, -diagonalSpeed);
                arms.setVelocity(-diagonalSpeed, -diagonalSpeed);
                this.flipX = true;
            } else if (W_Down && D_Down) {
                this.setVelocity(diagonalSpeed, -diagonalSpeed);
                arms.setVelocity(diagonalSpeed, -diagonalSpeed);
                this.flipX = false;
            } else if (S_Down && A_Down) {
                this.setVelocity(-diagonalSpeed, diagonalSpeed);
                arms.setVelocity(-diagonalSpeed, diagonalSpeed);
                this.flipX = true;
            } else if (S_Down && D_Down) {
                this.setVelocity(diagonalSpeed, diagonalSpeed);
                arms.setVelocity(diagonalSpeed, diagonalSpeed);
                this.flipX = false;
            } else if (A_Down) {
                this.setVelocity(-speed, 0);
                arms.setVelocity(-speed, 0);
                this.flipX = true;
            } else if (D_Down) {
                this.setVelocity(speed, 0);
                arms.setVelocity(speed, 0);
                this.flipX = false;
            } else if (W_Down) {
                this.setVelocity(0, -speed);
                arms.setVelocity(0, -speed);
            } else if (S_Down) {
                this.setVelocity(0, speed);
                arms.setVelocity(0, speed);
            }
            this.anims.play("move", true);
        } else {
            this.setVelocity(0, 0);
            arms.setVelocity(0, 0);
            this.anims.play("idle", true);
        }
    }
}
