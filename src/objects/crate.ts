import Phaser from "phaser";
import { Ingredient } from "./dish_ing";

interface CrateProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
    ingredient: Ingredient;
}

export class Crate extends Phaser.Physics.Arcade.Sprite {
    //Frame of crate sprite determines what ingredient is stored within...
    //F0: banana, F1: blueberry, F2: bread, F3: butter, F4: eggs, F5: milk
    static ingredientFrameMap: { [key: string]: number } = {
        BA: 0,
        BL: 1,
        BR: 2,
        BU: 3,
        EG: 4,
        MI: 5,
    };

    constructor(config: CrateProps) {
        super(config.scene, config.x, config.y, "crates");
        this.setIngredient(config.ingredient);
    }

    setIngredient(ingredient: Ingredient) {
        const index = Crate.ingredientFrameMap[ingredient.name];
        this.setFrame(index);
    }
}
