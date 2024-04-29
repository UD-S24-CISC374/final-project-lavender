import Phaser from "phaser";

interface IngredientProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
}

export class Ingredient extends Phaser.Physics.Arcade.Sprite {
    //Ingredient can be one of 6 items...
    //Eggs (EG); Milk (MI); Butter (BU); Bread (BR); Banana (BA); Blueberry (BL)
    name: string;

    constructor(config: IngredientProps, texture: string) {
        super(config.scene, config.x, config.y, texture);
        this.name = texture.slice(0, 2).toUpperCase();

        config.scene.add.existing(this);
        config.scene.physics.add.existing(this, false);
        this.setCollideWorldBounds(true);
    }
}
