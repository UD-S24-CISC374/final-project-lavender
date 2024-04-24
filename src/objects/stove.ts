import Phaser from "phaser";
import { Dish } from "./dish";
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
    pointer: Phaser.Input.Pointer;

    inStove: Array<Ingredient>;
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
            this.inStove[0].destroy();
            this.inStove.shift;
            this.inStove.push(item);
        } else {
            this.inStove.push(item);
            this.itemCount++;
        }
    }

    makeDish(): Dish {
        //Iterate through each available recipe
        for (const recipe of Dish.recipes) {
            if (this.matchRecipe(recipe)) {
                let texture = "baked banana";
                for (const ing of this.inStove) {
                    ing.destroy();
                }
                this.inStove = [];
                return new Dish(
                    { scene: this.scene, x: this.x, y: this.y },
                    texture
                );
            }
        }
        for (const ing of this.inStove) {
            ing.destroy();
        }
        this.inStove = [];
        return new Dish(
            { scene: this.scene, x: this.x, y: this.y },
            "blueberry french toast"
        ).setScale(1 / 10); //sets dish5 as a failed recipe placeholder
    }

    matchRecipe(recipe: string[]): boolean {
        //Create copy of ingredients in stove
        const inStove_cpy = this.inStove.slice();
        //Check if stove has enough ingredients to match recipe length
        if (inStove_cpy.length < recipe.length) {
            return false;
        }
        //Iterate through each ingredient in the recipe
        for (const recIng of recipe) {
            //Find & remove ingredient from stove copy
            const ind = inStove_cpy.findIndex((ing) => ing.name === recIng);
            if (ind === -1) {
                //If ingredient is not found, return false
                return false;
            }
            inStove_cpy.splice(ind, 1);
        }
        return true;
    }
}
