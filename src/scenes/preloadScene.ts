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

        //Additional Images
        this.load.image("kitchen1", "assets/img/cartoon-kitchen.jpg");
        this.load.image("kitchen2", "assets/img/restaurant_oven.jpg");
        this.load.image("tomato", "assets/img/Tomato.png");
        this.load.image("bread", "assets/img/bread.png");
        this.load.image("waitress", "assets/img/jennac.jpg");
    }

    create() {
        this.scene.start("TitleScene");
    }
}
