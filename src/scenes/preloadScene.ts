import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        //Title Logo, Play Button, and Background Assets
        this.load.image(
            "title_logo",
            "assets/img/title_assets/schedulsine_logo2.png"
        );
        this.load.image("play_bttn", "assets/img/title_assets/play_bttn.png");
        this.load.image("title_bg", "assets/img/title_assets/title_bg.png");

        //Level select preloads
        this.load.image(
            "tutorial_btn",
            "assets/img/title_assets/tutorial_btn.png"
        );
        this.load.image("day1_btn", "assets/img/title_assets/day1_btn.png");
        this.load.image("day2_btn", "assets/img/title_assets/day2_btn.png");
        this.load.image("day3_btn", "assets/img/title_assets/day3_btn.png");

        //Additional Images
        this.load.image("tomato", "assets/img/Tomato.png");
        this.load.image("kitchen1", "assets/img/cartoon-kitchen.jpg");
        this.load.image("kitchen2", "assets/img/restaurant_oven.jpg");

        //Sounds
        this.load.audio("backgroundMusic", "assets/sounds/overcookedSound.mp3");
        this.load.audio("buttonSound", "assets/sounds/buttonSound.mp3");
        this.load.audio("levelSound", "assets/sounds/levelSound.mp3");
        this.load.audio("happySound", "assets/sounds/happySound.mp3");
        this.load.audio("orderUp", "assets/sounds/orderUp.mp3");

        //Tiles and Map
        this.load.image(
            "tiles",
            "assets/tilemaps/tilesets/Room_Builder_48x48.png"
        );
        this.load.image(
            "i_tiles",
            "assets/tilemaps/tilesets/Interiors_48x48.png"
        );
        this.load.image(
            "g_tiles",
            "assets/tilemaps/tilesets/1_Generic_48x48.png"
        );
        this.load.tilemapTiledJSON("map_1", "assets/tilemaps/map_one.json");
        this.load.tilemapTiledJSON("map_d", "assets/tilemaps/map_d.json");
        this.load.tilemapTiledJSON(
            "map_revamp",
            "assets/tilemaps/map_revamp.json"
        );

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

        //cursor
        this.load.image("arrow", "assets/img/title_assets/arrow.png");

        this.load.image("bread", "assets/img/dishes/ingredients/bread.png");
        this.load.image("butter", "assets/img/dishes/ingredients/butter.png");
        this.load.image("eggs", "assets/img/dishes/ingredients/egg.png");
        this.load.image("milk", "assets/img/dishes/ingredients/mulk.png");

        //Additional Images
        this.load.image("tomato", "assets/img/Tomato.png");
        this.load.image("kitchen1", "assets/img/cartoon-kitchen.jpg");
        this.load.image("kitchen2", "assets/img/restaurant_oven.jpg");
        this.load.image("tomato", "assets/img/Tomato.png");
        this.load.image("soup", "assets/img/tomato-soup.png");
        //Dish preload
        this.load.image("BA", "assets/img/dishes/Baked_Banana.png"); //baked banana
        this.load.image("BR_EG", "assets/img/dishes/Egg_Sandwich.png"); //egg sandwich
        this.load.image("BA_BL_MI", "assets/img/dishes/Smoothie.png"); //fruit smoothie
        this.load.image("BA_BR_BU_EG", "assets/img/dishes/Banana_Bread.png"); //banana bread
        this.load.image(
            "BL_BR_BU_EG_MI",
            "assets/img/dishes/Blueberry_French_Toast.png"
        ); //bbft
        this.load.image("failed_dish", "assets/img/dishes/Flowery_Mess.png"); //failed dish

        //Ingredient Crates Preload
        this.load.spritesheet("crate", "assets/img/ing_crate.png", {
            frameWidth: 48,
            frameHeight: 48,
        });

        //Order Ticket
        this.load.image("order", "assets/img/order_ticket.png");
    }

    create() {
        this.scene.start("TitleScene");
    }
}
