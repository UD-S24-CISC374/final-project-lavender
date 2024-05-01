import Phaser from "phaser";
import { Dish } from "./dish";
import { Ingredient } from "./dish_ing";

interface OrdersProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
}

export class Orders extends Phaser.Physics.Arcade.Image {
    //Every order should have these properties...
    // - price: number; (format -> $00.00)
    // - num_order: number; (format -> Order #0)
    // - dish: Dish;
    // - parts: Array<Ingredient>;

    price: number;
    num_order: number;
    parts: Array<Ingredient>;
    dish: Dish;

    constructor(config: OrdersProps) {
        super(config.scene, config.x, config.y, "order ticket");
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this, false);
        this.setCollideWorldBounds(true);
    }
}
