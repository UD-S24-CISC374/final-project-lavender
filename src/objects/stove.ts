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
            this.inStove[0].destroy();
            this.inStove.shift();
            this.inStove.push(item);
        } else {
            this.inStove.push(item);
            this.itemCount++;
        }
    }

    makeDish() {
        let dish: Dish;
        let match = false;
        for (const recipe of Dish.recipes) {
            if (recipe.length === 1) {
                //Single ingredient recipes.
                match = this.inStove.some((item) => item.name === recipe[0]);
            } else {
                //Multi-ingredient recipes.
                recipe.sort();
                this.inStove.sort();
                match = recipe.every((ingredient: string) =>
                    this.inStove.some((item) => item.name === ingredient)
                );
            }
            if (match) {
                const texture = this.getDishTexture(recipe);
                dish = new Dish(
                    { scene: this.scene, x: this.x, y: this.y + 20 },
                    texture
                );
                this.clearStove();
                return dish;
            }
        }
        //If no matches are found, created failed dish.
        dish = new Dish(
            {
                scene: this.scene,
                x: this.x + Phaser.Math.RND.between(0, 5),
                y: this.y + 20,
            },
            "BL_BR_BU_EG_MI"
        ).setScale(0.1);
        this.clearStove();
        return dish;
    }

    clearStove() {
        for (const ing of this.inStove) {
            ing.destroy();
        }
        this.inStove = [];
    }

    getDishTexture(recipe: Array<string>) {
        //BA, BL, BR, BU, EG, MI
        recipe = recipe.sort();
        return recipe.join("_");
    }
}
