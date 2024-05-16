import Phaser from "phaser";

interface ConProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
}

export class Conveyor extends Phaser.Physics.Arcade.Sprite {
    constructor(config: ConProps) {
        super(config.scene, config.x, config.y, "conveyor");
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this, false);
        this.setOrigin(0.5);
    }

    createAnims() {
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("conveyor", {
                start: 0,
                end: 32,
            }),
            frameRate: 24,
            repeat: -1,
        });
    }
}
