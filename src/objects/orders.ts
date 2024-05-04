import Phaser from "phaser";
//import { Dish } from "./dish";
//import { Ingredient } from "./dish_ing";

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
    parts: string;
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
            this.dish_name = "Baked Banana";
            this.parts = "• Banana";
        } else if (randNum == 1) {
            this.dish_name = "Egg Sandwich";
            this.parts = "• Egg\n• Bread";
        } else if (randNum == 2) {
            this.dish_name = "Fruit Smoothie";
            this.parts = "• Banana       • Milk\n• Blueberry";
        } else if (randNum == 3) {
            this.dish_name = "Banana Bread";
            this.parts = "• Banana       • Bread\n• Butter       • Egg";
        } else if (randNum == 4) {
            this.dish_name = "Blueberry French Toast";
            this.parts =
                "• Blueberries\n• Bread       • Butter\n• Eggs         • Milk";
        }
    }

    static initializePopup(scene: Phaser.Scene): Phaser.GameObjects.Container {
        //Container stuff
        let popup: Phaser.GameObjects.Container;
        popup = scene.add.container(0, 0);
        popup.setVisible(false);
        //Create order information elements.
        const bubbleGraphics = scene.add.graphics();
        bubbleGraphics.fillStyle(0xffffff, 0.8); // white w transpareny
        bubbleGraphics.fillRoundedRect(0, 0, 165, 135, 10); // x, y, width, height, radius
        bubbleGraphics.lineStyle(2, 0x9dc183, 1); // line width, color, alpha
        bubbleGraphics.strokeRoundedRect(0, 0, 165, 135, 10);
        //Dish Image
        const image = scene.add.image(7.5, 41, "BL_BR_BU_EG_MI");
        image.setOrigin(0, 0.5); // align left
        image.setScale(0.12); // scale of image
        //Add text next to the image
        const text = scene.add.text(125, 45, "Blueberry\nFrench\nToast", {
            font: "bold 16px Bangers",
            color: "#355E3B",
        });
        text.setOrigin(0.5, 0.5); // centers text
        //Adds bullet points below the main text
        const bulletPoints = scene.add.text(
            15,
            80,
            "• Blueberries\n• Bread       • Butter\n• Eggs         • Milk",
            {
                font: "14px Bangers",
                color: "#355E3B",
            }
        );
        bulletPoints.setOrigin(0, 0); //Align text to the left
        bulletPoints.setLineSpacing(2.5);
        popup.add([bubbleGraphics, image, text, bulletPoints]);
        popup.setSize(165, 135);
        return popup;
    }
}
