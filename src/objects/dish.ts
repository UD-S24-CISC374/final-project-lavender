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
        this.name = texture;
        if (this.name == "BA") {
            this.recipe = Dish.recipes[0];
        } else if (this.name == "BA_BR_BU_EG") {
            this.recipe = Dish.recipes[3];
        } else if (this.name == "BL_BR_BU_EG_MI") {
            this.recipe = Dish.recipes[4];
        } else if (this.name == "BR_EG") {
            this.recipe = Dish.recipes[1];
        } else if (this.name == "BA_BL_MI") {
            this.recipe = Dish.recipes[2];
        }
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this, false);
        this.setCollideWorldBounds(true);
    }
}
