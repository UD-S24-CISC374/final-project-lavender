import Phaser from "phaser";

export default class LevelSelect extends Phaser.Scene {
    constructor() {
        super({ key: "LevelSelect" });
    }

    preload() {
        //Tiles and Map
        this.load.image(
            "tiles",
            "assets/tilemaps/tilesets/Room_Builder_48x48.png"
        );
        this.load.tilemapTiledJSON("map_1", "assets/tilemaps/map_one.json");

        //Character Spritesheet
        this.load.spritesheet(
            "chef_player",
            "assets/img/player_assets/chef_dude2.png",
            {
                frameWidth: 64,
                frameHeight: 64,
            }
        );
        this.load.spritesheet(
            "chef_arms",
            "assets/img/player_assets/chef_dude_arms.png",
            {
                frameWidth: 64,
                frameHeight: 64,
            }
        );

        //Additional Images
        this.load.image("tomato", "assets/img/Tomato.png");
        this.load.image("kitchen1", "assets/img/cartoon-kitchen.jpg");
        this.load.image("kitchen2", "assets/img/restaurant_oven.jpg");

        //Stoves, Dishes, Ingredients
        this.load.spritesheet("stove", "assets/img/cooking_pot_anim.png", {
            frameWidth: 64,
            frameHeight: 64,
        });

        this.load.image("banana", "assets/img/dishes/ingredients/banana.png");
        this.load.image(
            "blueberry",
            "assets/img/dishes/ingredients/blueberry_4.png"
        );
        this.load.image("bread", "assets/img/dishes/ingredients/bread.png");
        this.load.image("butter", "assets/img/dishes/ingredients/butter.png");
        this.load.image("eggs", "assets/img/dishes/ingredients/egg.png");
        this.load.image("milk", "assets/img/dishes/ingredients/mulk.png");
    }

    create() {
        //Background
        const background = this.add.image(
            this.cameras.main.displayWidth * 0.5,
            this.cameras.main.displayHeight * 0.5,
            "title_bg"
        );
        background.setFlipX(true);

        //Add buttons
        const tutorial_btn = this.add.image(
            this.cameras.main.width * (1 / 4),
            this.cameras.main.height * (1 / 4),
            "tutorial_btn"
        );
        tutorial_btn
            .setInteractive()
            .on("pointerdown", () => this.scene.start("informationScene"))
            .on("pointerover", () => tutorial_btn.setScale(1.1))
            .on("pointerout", () => tutorial_btn.setScale(1));

        const day1_btn = this.add.image(
            this.cameras.main.width * (3 / 4),
            this.cameras.main.height * (1 / 4),
            "day1_btn"
        );
        day1_btn
            .setInteractive()
            .on("pointerdown", () => this.scene.start("game_2"))
            .on("pointerover", () => day1_btn.setScale(1.1))
            .on("pointerout", () => day1_btn.setScale(1));

        const day2_btn = this.add.image(
            this.cameras.main.width * (1 / 4),
            this.cameras.main.height * (3 / 4),
            "day2_btn"
        );
        day2_btn
            .setInteractive()
            .on("pointerover", () => day2_btn.setScale(1.1))
            .on("pointerout", () => day2_btn.setScale(1));

        const day3_btn = this.add.image(
            this.cameras.main.width * (3 / 4),
            this.cameras.main.height * (3 / 4),
            "day3_btn"
        );
        day3_btn
            .setInteractive()
            .on("pointerover", () => day3_btn.setScale(1.1))
            .on("pointerout", () => day3_btn.setScale(1));
    }
}
