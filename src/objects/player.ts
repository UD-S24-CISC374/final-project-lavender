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
        if (
            this.cursors?.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown ||
            this.cursors?.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown ||
            this.cursors?.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown ||
            this.cursors?.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown
        ) {
            if (this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
                this.setVelocityX(-230);
                arms.setVelocityX(-230);
                this.flipX = true;
            } else if (
                this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown
            ) {
                this.setVelocityX(230);
                arms.setVelocityX(230);
                this.flipX = false;
            }
            if (this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
                this.setVelocityY(-230);
                arms.setVelocityY(-230);
            } else if (
                this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown
            ) {
                this.setVelocityY(230);
                arms.setVelocityY(230);
            }
            this.anims.play("move", true);
        } else {
            this.anims.play("idle", true);
        }
    }
}
