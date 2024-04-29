import Phaser from "phaser";

interface ArmsProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
}

export class Player_Arms extends Phaser.Physics.Arcade.Sprite {
    hasItem: boolean;
    overlapping: boolean;
    stoveOverlap: boolean;
    crateOverlap: boolean;

    constructor(config: ArmsProps) {
        super(config.scene, config.x, config.y, "chef_arms");
        this.hasItem = false;
        this.overlapping = false;
        this.stoveOverlap = false;
        this.crateOverlap = false;
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this, false);
        this.setCollideWorldBounds(true);
    }

    createAnims() {
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("chef_arms", {
                start: 0,
                end: 0,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "grab",
            frames: this.anims.generateFrameNumbers("chef_arms", {
                start: 1,
                end: 1,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }

    playAnims(animation: boolean) {
        if (animation) {
            this.flipY = true;
            this.anims.play("grab");
        } else {
            this.flipY = false;
            this.anims.play("idle");
        }
    }
}
