import Phaser from "phaser";
//import { Dish } from "./dish";
import { Ingredient } from "./dish_ing";

interface OrdersProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
    num_order: number;
}

export class Orders extends Phaser.Physics.Arcade.Image {
    //Every order should have these properties...
    // - price: number; (format -> $00.00)
    // - num_order: number; (format -> Order #0)
    // - dish: Dish;
    // - parts: Array<Ingredient>;

    name: string;
    price: string;
    parts: Array<Ingredient>;
    dish_texture: string;
    dish_name: string;
    ordersTouched: boolean;

    constructor(config: OrdersProps) {
        super(config.scene, config.x, config.y, "order");
        this.name = "Order #" + config.num_order;
        this.generateRandDish();
        this.price = this.generateRandPrice(1, 100);
        this.ordersTouched = false;

        config.scene.add.existing(this);
        config.scene.physics.add.existing(this, false);
        this.setCollideWorldBounds(true);

        //Changes bounds of object.
        this.setSize(this.width + 30, this.height);
    }

    generateRandPrice(min: number, max: number): string {
        const dollar = Math.floor(Math.random() * (max - min + 1));
        const cents = Math.floor(Math.random() * 100);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const price = dollar + cents / 100;
        return "$" + price.toFixed(2);
    }

    generateRandDish() {
        let textArrar: Array<string>;
        let randNum = Math.floor(Math.random() * (5 - 0)) + 0;
        textArrar = [
            "BA",
            "BR_EG",
            "BA_BL_MI",
            "BA_BR_BU_EG",
            "BL_BR_BU_EG_MI",
        ];
        this.dish_texture = textArrar[randNum];
        if (randNum == 0) {
            this.dish_name = "Banana";
        } else if (randNum == 1) {
            this.dish_name = "Egg Sandwich";
        } else if (randNum == 2) {
            this.dish_name = "Fruit Smoothie";
        } else if (randNum == 3) {
            this.dish_name = "Banana Bread";
        } else if (randNum == 4) {
            this.dish_name = "Blueberry French Toast";
        }
    }
}
