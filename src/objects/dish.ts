import Phaser from "phaser";

interface DishProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
}

export class Dish extends Phaser.Physics.Arcade.Sprite {
    //Dish can be one of 5 items...
    //Baked Banana (BAK); Banana Bread (BAN); Blueberry French Toast (BLU)
    //Egg Sandwich (EGG); Fruit Smoothie (FRU)
    name: string;
    recipe: Array<string>;
    static recipes = [
        ["BA"],
        ["BR", "EG"],
        ["BA", "BL", "MI"],
        ["BA", "BR", "BU", "EG"],
        ["BL", "BR", "BU", "EG", "MI"],
    ];

    constructor(config: DishProps, texture: string) {
        super(config.scene, config.x, config.y, texture);
        this.name = texture.slice(0, 2).toUpperCase();
        if (this.name == "BAK") {
            this.recipe = Dish.recipes[0];
        } else if (this.name == "BAN") {
            this.recipe = Dish.recipes[4];
        } else if (this.name == "BLU") {
            this.recipe = Dish.recipes[5];
        } else if (this.name == "EGG") {
            this.recipe = Dish.recipes[2];
        } else {
            this.recipe = Dish.recipes[3];
        }
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this, false);
        this.setCollideWorldBounds(true);
    }
}
