import Phaser from "phaser";

export type Collidable =
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Tilemaps.Tile;

interface ArmsProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
}

export class Player_Arms extends Phaser.Physics.Arcade.Sprite {
    hasItem: boolean;
    overlapping: boolean;

    constructor(config: ArmsProps) {
        super(config.scene, config.x, config.y, "chef_arms");
        this.hasItem = false;
        this.overlapping = false;
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

    ////Ignore this. Was playing around with having the arms rotate towards the mouse.
    //grabObject(scene: Scene) {
    //    var targetAngle =
    //        Phaser.Math.RAD_TO_DEG *
    //        Phaser.Math.Angle.Between(
    //            this.x,
    //            this.y,
    //            scene.input.activePointer.x,
    //            scene.input.activePointer.y
    //        );
    //    if (!this.hasItem) {
    //        this.anims.play("grab", true);
    //        this.setAngle(targetAngle - 90);
    //    }
    //}
}
