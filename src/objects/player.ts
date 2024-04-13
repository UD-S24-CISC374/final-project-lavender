import Phaser from "phaser";
//import { Player_Arms } from "./player_arms";

interface PlayerProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
}

export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(config: PlayerProps) {
        super(config.scene, config.x, config.y, "chef_player");
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
}
