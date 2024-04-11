import Phaser from "phaser";

interface PlayerProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
}

export class Player extends Phaser.Physics.Arcade.Sprite {
    public cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(config: PlayerProps) {
        super(config.scene, config.x, config.y, "dude");
        this.cursors = config.cursors;
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this, false);
        this.setCollideWorldBounds(true);
    }

    createAnims() {
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 131,
                end: 132,
            }),
            frameRate: 2,
            repeat: -1,
        });
        this.anims.create({
            key: "l_walk",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 118,
                end: 125,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "r_walk",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 144,
                end: 151,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "u_walk",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 105,
                end: 112,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "d_walk",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 131,
                end: 138,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }

    movePlayer() {
        //Horizontal Movement
        if (this.cursors?.left.isDown) {
            this.setVelocityX(-300);
            this.anims.play("l_walk", true);
        } else if (this.cursors?.right.isDown) {
            this.setVelocityX(300);
            this.anims.play("r_walk", true);
        } else {
            this.setVelocityX(0);
        }
        //Vertical Movement
        if (this.cursors?.up.isDown) {
            this.setVelocityY(-300);
            this.anims.play("u_walk", true);
        } else if (this.cursors?.down.isDown) {
            this.setVelocityY(300);
            this.anims.play("d_walk", true);
        } else {
            this.setVelocityY(0);
        }
        //Check if idle
        if (
            this.cursors?.left.isUp &&
            this.cursors.right.isUp &&
            this.cursors.up.isUp &&
            this.cursors.down.isUp
        ) {
            this.anims.play("idle", true);
        }
    }
}
