import Phaser from "phaser";
//import { Player } from "./player";
//import { Player_Arms } from "./player_arms";

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

    constructor(config: StoveProps) {
        super(config.scene, config.x, config.y, "");
        this.inStove = [];
        this.pointer = config.scene.input.mousePointer;
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this, false);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    stoveOpen(arms: Player_Arms) {}
}
