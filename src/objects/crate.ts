import Phaser from "phaser";
//import { Ingredient } from "./dish_ing";

interface CrateProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
    ingredient: string;
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
        super(config.scene, config.x, config.y, "crate");
        this.setIngredient(config.ingredient);
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this, false);
        this.setCollideWorldBounds(true);
    }

    setIngredient(ingredient: string) {
        const index = Crate.ingredientFrameMap[ingredient];
        this.setFrame(index);
    }
}
