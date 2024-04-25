import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        //Title Logo, Play Button, and Background Assets
        this.load.image({
            key: "title_logo",
            url: "assets/img/title_assets/schedulsine_logo2.png",
        });
        this.load.image({
            key: "play_bttn",
            url: "assets/img/title_assets/play_bttn.png",
        });
        this.load.image({
            key: "title_bg",
            url: "assets/img/title_assets/title_bg.png",
        });

        //Sounds
        this.load.audio("backgroundMusic", "assets/sounds/overcookedSound.mp3");

        //Level select preloads
        this.load.image(
            "tutorial_btn",
            "assets/img/title_assets/tutorial_btn.png"
        );
        this.load.image("day1_btn", "assets/img/title_assets/day1_btn.png");
        this.load.image("day2_btn", "assets/img/title_assets/day2_btn.png");
        this.load.image("day3_btn", "assets/img/title_assets/day3_btn.png");

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

        //Dish preload
        this.load.image("BA", "assets/img/dishes/Baked_Banana.png"); //baked banana
        this.load.image("BR_EG", "assets/img/dishes/Egg_Sandwich.png"); //egg sandwich
        this.load.image("BA_BL_MI", "assets/img/dishes/Smoothie.png"); //fruit smoothie
        this.load.image("BA_BR_BU_EG", "assets/img/dishes/Banana_Bread.png"); //banana bread
        this.load.image(
            "BL_BR_BU_EG_MI",
            "assets/img/dishes/Blueberry_French_Toast.png"
        ); //bbft

        //Ingredient Crates Preload
        this.load.spritesheet("crate", "assets/img/ing_crate.png");
    }

    create() {
        this.scene.start("TitleScene");
    }
}
