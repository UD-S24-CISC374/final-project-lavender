import Phaser from "phaser";

interface ArmsProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
}

export class Player_Arms extends Phaser.Physics.Arcade.Sprite {
    constructor(config: ArmsProps) {
        super(config.scene, config.x, config.y, "chef_arms");
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this, false);
        this.setCollideWorldBounds(true);
    }

    target = 0;

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

    grabObject(t_angle: number) {
        this.anims.play("grab", true);
        this.setAngle(t_angle - 90);
    }
}
