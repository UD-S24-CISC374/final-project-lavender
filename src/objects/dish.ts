import Phaser from "phaser";
//import { Ingredient } from "./dish_ing";

interface DishProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
    recipe: Array<string>;
}

export class Dish extends Phaser.Physics.Arcade.Sprite {
    //Dish can be one of 5 items...
    //Baked Banana (BAK); Banana Bread (BAN); Blueberry French Toast (BLU)
    //Egg Sandwich (EGG); Fruit Smoothie (FRU)
    name: string;
    recipe: Array<string>;

    constructor(config: DishProps, texture: string) {
        super(config.scene, config.x, config.y, texture);
        this.name = texture.slice(0, 2).toUpperCase();
        if (this.name == "BAK") {
            this.recipe = ["BA"];
        } else if (this.name == "BAN") {
            this.recipe = ["BA", "BR", "BU", "EG"];
        } else if (this.name == "BLU") {
            this.recipe = ["BL", "BR", "BU", "EG", "MI"];
        } else if (this.name == "EGG") {
            this.recipe = ["BR", "EG"];
        } else {
            this.recipe = ["BA", "BL", "EG"];
        }
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this, false);
        this.setCollideWorldBounds(true);
    }
}
