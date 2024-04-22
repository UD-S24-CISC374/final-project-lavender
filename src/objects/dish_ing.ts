import Phaser from "phaser";

interface IngredientProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
}

export class Ingredient extends Phaser.Physics.Arcade.Sprite {
    constructor(config: IngredientProps) {
        super(config.scene, config.x, config.y, "");
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this, false);
        this.setCollideWorldBounds(true);
    }
}
