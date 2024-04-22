import Phaser from "phaser";
import { Ingredient } from "./dish_ing";

interface DishProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
    //recipe: Array<Ingredient>;
}

export class Dish extends Phaser.Physics.Arcade.Sprite {
    recipe: Array<Ingredient>;

    constructor(config: DishProps, texture: string | Phaser.Textures.Texture) {
        super(config.scene, config.x, config.y, texture);
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this, false);
        this.setCollideWorldBounds(true);
        //this.recipe = config.recipe;
    }
}
