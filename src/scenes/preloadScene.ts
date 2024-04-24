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

        //Dish preload
        this.load.image("baked banana", "assets/img/dishes/Baked_Banana.png"); //baked banana
        this.load.image("egg sandwich", "assets/img/dishes/Egg_Sandwich.png"); //egg sandwich
        this.load.image("fruit smoothie", "assets/img/dishes/Smoothie.png"); //fruit smoothie
        this.load.image("banana bread", "assets/img/dishes/Banana_Bread.png"); //banana bread
        this.load.image(
            "blueberry french toast",
            "assets/img/dishes/Blueberry_French_Toast.png"
        ); //bbft
    }

    create() {
        this.scene.start("TitleScene");
    }
}
