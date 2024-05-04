/* eslint-disable no-prototype-builtins */
import Phaser from "phaser";
import { Dish } from "./dish";
import { Ingredient } from "./dish_ing";

interface StoveProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
}

export class Stove extends Phaser.Physics.Arcade.Sprite {
    inStove: Array<Ingredient>;
    itemCount: number;

    constructor(config: StoveProps) {
        super(config.scene, config.x, config.y, "stove");
        this.inStove = [];
        this.itemCount = 0;
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
            if (this.inStove[0]) {
                this.inStove[0].destroy();
            }
            this.inStove.shift();
            this.inStove.push(item);
            this.itemCount = 5;
        } else {
            this.inStove.push(item);
            this.itemCount++;
        }
    }

    makeDish() {
        let dish: Dish;
        let match = false;

        for (const recipe of Dish.recipes) {
            const recipeCounts: { [key: string]: number } = {};
            recipe.forEach((ingredient) => {
                recipeCounts[ingredient] = (recipeCounts[ingredient] || 0) + 1;
            });

            const stoveCounts: { [key: string]: number } = {};
            this.inStove.forEach((item) => {
                stoveCounts[item.name] = (stoveCounts[item.name] || 0) + 1;
            });

            let isRecipeMatch = true;
            for (const ingredient in recipeCounts) {
                if (recipeCounts.hasOwnProperty(ingredient)) {
                    if (
                        recipeCounts[ingredient] !==
                        (stoveCounts[ingredient] || 0)
                    ) {
                        isRecipeMatch = false;
                        break;
                    }
                }
            }
            if (isRecipeMatch) {
                for (const ingredient in stoveCounts) {
                    if (
                        stoveCounts.hasOwnProperty(ingredient) &&
                        !recipeCounts.hasOwnProperty(ingredient)
                    ) {
                        isRecipeMatch = false;
                        break;
                    }
                }
            }

            match = isRecipeMatch;

            if (match) {
                const texture = this.getDishTexture(recipe);
                dish = new Dish(
                    { scene: this.scene, x: this.x, y: this.y + 20 },
                    texture
                ).setScale(0.1);
                this.clearStove();
                return dish;
            }
        }
        dish = new Dish(
            {
                scene: this.scene,
                x: this.x,
                y: this.y,
            },
            "failed_dish"
        ).setScale(0.1);
        this.clearStove();
        return dish;
    }

    clearStove() {
        for (const ing of this.inStove) {
            ing.destroy();
        }
        this.itemCount = 0;
        this.inStove = [];
    }

    getDishTexture(recipe: Array<string>) {
        //BA, BL, BR, BU, EG, MI
        recipe = recipe.sort();
        return recipe.join("_");
    }
}
