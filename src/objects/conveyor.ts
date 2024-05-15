import Phaser from "phaser";
import { Orders } from "./orders";

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
    static orderAlgo(strategy: number, orders: Array<Orders>) {
        //Strat. number determines which algorithm is being used.
        //Generate algorithms.
        //0 = FIFO, 1 = SJN, 2 = Priority (money)
        if (strategy == 0) {
            //
        } else if (strategy == 1) {
            //
        } else if (strategy == 2) {
            //
        }
    }
}
