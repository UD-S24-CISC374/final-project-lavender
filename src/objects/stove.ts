import Phaser from "phaser";
//import { Player } from "./player";
//import { Player_Arms } from "./player_arms";
//import { Dish } from "./dish";

export type Collidable =
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Tilemaps.Tile;

interface StoveProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
}

export class Stove extends Phaser.Physics.Arcade.Sprite {
    inStove: Array<Phaser.Physics.Arcade.Sprite>;
    pointer: Phaser.Input.Pointer;
    itemCount: number;

    constructor(config: StoveProps) {
        super(config.scene, config.x, config.y, "");
        this.inStove = [];
        this.itemCount = 0;
        this.pointer = config.scene.input.mousePointer;
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this, false);
    }

    insertItem(item: Phaser.Physics.Arcade.Sprite) {
        if (this.itemCount >= 5) {
            this.inStove.shift;
            this.inStove.push(item);
        } else {
            this.inStove.push(item);
            this.itemCount++;
        }
    }

    openGui() {}
}
