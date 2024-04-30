import Phaser from "phaser";
//import { Player_Arms } from "./player_arms";
import { Ingredient } from "./dish_ing";

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

    crateTouched: boolean;

    constructor(config: CrateProps) {
        super(config.scene, config.x, config.y, "crate");
        this.setIngredient(config.ingredient);
        this.name = config.ingredient;
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this, false);
        this.setCollideWorldBounds(true);
        this.crateTouched = false;
    }

    setIngredient(ingredient: string) {
        const index = Crate.ingredientFrameMap[ingredient];
        this.setFrame(index);
    }

    createIngredient(
        group: Phaser.Physics.Arcade.Group | undefined,
        ingredient: string
    ): Ingredient {
        let item: Ingredient;
        switch (Crate.ingredientFrameMap[ingredient]) {
            case 0:
                item = new Ingredient(
                    { scene: this.scene, x: this.x + 20, y: this.y },
                    "banana"
                ).setScale(0.5);
                break;
            case 1:
                item = new Ingredient(
                    { scene: this.scene, x: this.x + 20, y: this.y },
                    "blueberry"
                ).setScale(0.5);
                break;
            case 2:
                item = new Ingredient(
                    { scene: this.scene, x: this.x + 20, y: this.y },
                    "bread"
                ).setScale(0.5);
                break;
            case 3:
                item = new Ingredient(
                    { scene: this.scene, x: this.x + 20, y: this.y },
                    "butter"
                ).setScale(0.5);
                break;
            case 4:
                item = new Ingredient(
                    { scene: this.scene, x: this.x + 20, y: this.y },
                    "eggs"
                ).setScale(0.5);
                break;
            default:
                item = new Ingredient(
                    { scene: this.scene, x: this.x + 20, y: this.y },
                    "milk"
                ).setScale(0.5);
                break;
        }
        if (group) {
            group.add(item);
        }
        return item;
    }
}
