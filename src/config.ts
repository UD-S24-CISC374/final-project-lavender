import Phaser from "phaser";

import TitleScene from "./scenes/titleScene";
import PreloadScene from "./scenes/preloadScene";
import LevelSelect from "./scenes/levelSelect";

import InformationScene from "./scenes/informationScene";
import InformationScene2 from "./scenes/informationScene2";

import Game_1 from "./scenes/game scenes/game_1";
import GameIntro from "./scenes/GameIntro";
import Game_2 from "./scenes/game scenes/game_2";

//608x480 or 1280x720
const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 720;

export const CONFIG = {
    title: "Schedulsine",
    version: "0.0.1",
    type: Phaser.AUTO,
    backgroundColor: "#ffffff",
    scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    },
    scene: [
        PreloadScene,
        TitleScene,
        InformationScene,
        InformationScene2,
        Game_1,
        GameIntro,
        Game_2,
        LevelSelect,
    ],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 0 },
        },
    },
    input: {
        keyboard: true,
        mouse: true,
        touch: true,
        gamepad: false,
    },
    render: {
        pixelArt: false,
        antialias: true,
    },
};
