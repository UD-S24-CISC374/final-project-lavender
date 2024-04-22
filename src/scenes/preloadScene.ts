import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        //Tiles and Map
        this.load.image(
            "tiles",
            "assets/tilemaps/tilesets/Room_Builder_48x48.png"
        );
        this.load.tilemapTiledJSON("map_1", "assets/tilemaps/map_one.json");

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

        //Additional Images
        this.load.image("tomato", "assets/img/Tomato.png");
        this.load.image("kitchen1", "assets/img/cartoon-kitchen.jpg");
        this.load.image("kitchen2", "assets/img/restaurant_oven.jpg");

        //Stoves, Dishes, Ingredients
        this.load.spritesheet("stove", "assets/img/cooking_pot.png");
    }

    create() {
        this.scene.start("TitleScene");
    }
}
