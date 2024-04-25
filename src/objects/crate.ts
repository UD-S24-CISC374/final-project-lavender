import Phaser from "phaser";
//import { Ingredient } from "./dish_ing";

interface CrateProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
}

export class Crate extends Phaser.Physics.Arcade.Sprite {
    //Frame of crate sprite determines what ingredient is stored within...
    //F0: banana, F1: blueberry, F2: bread, F3: butter, F4: eggs, F5: milk
    constructor(config: CrateProps) {
        super(config.scene, config.x, config.y, "crates");
    }

    setIngredient() {}
}
