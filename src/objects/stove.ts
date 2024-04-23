import Phaser from "phaser";
//import { Player } from "./player";
//import { Player_Arms } from "./player_arms";
//import { Dish } from "./dish";
import { Ingredient } from "./dish_ing";

export type Collidable =
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Tilemaps.Tile;

interface StoveProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
}

export class Stove extends Phaser.Physics.Arcade.Sprite {
    inStove: Array<Ingredient>;
    pointer: Phaser.Input.Pointer;
    itemCount: number;

    constructor(config: StoveProps) {
        super(config.scene, config.x, config.y, "stove");
        this.inStove = [];
        this.itemCount = 0;
        this.pointer = config.scene.input.mousePointer;
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this, false);
    }

    createAnims() {
        this.anims.create({
            key: "off",
            frames: this.anims.generateFrameNumbers("stove", {
                start: 0,
                end: 0,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "on",
            frames: this.anims.generateFrameNumbers("stove", {
                start: 1,
                end: 4,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }

    insertItem(item: Ingredient) {
        if (this.itemCount >= 5) {
            this.inStove.shift;
            this.inStove.push(item);
        } else {
            this.inStove.push(item);
            this.itemCount++;
        }
    }

    checkIngredient() {
        //Types of dishes:
        // - Blueberry French Toast: BL, BR, BU, EG, MI
        // - Banana Bread: BA, BR, BU, EG
        // - Fruit Smoothie: BA, BL, MI
        // - Egg Sandwich: BR, EG
        // - Baked Banana: BA
    }
}
