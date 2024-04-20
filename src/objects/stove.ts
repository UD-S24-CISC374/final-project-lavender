import Phaser from "phaser";

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
}
