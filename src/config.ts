import Phaser from "phaser";

import PreloadScene from "./scenes/preloadScene";
import TitleScene from "./scenes/titleScene";
import LevelSelect from "./scenes/levelSelect";

import InformationScene from "./scenes/informationScene";
import InformationScene2 from "./scenes/informationScene2";
import GameIntro from "./scenes/GameIntro";
import Game_1 from "./scenes/game scenes/game_1";

import Day_1 from "./scenes/game scenes/day1";

import EndScore from "./scenes/endScore";

//608x480 or 1280x720
const DEFAULT_WIDTH = 1104;
const DEFAULT_HEIGHT = 624;

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
        LevelSelect,
        InformationScene,
        InformationScene2,
        GameIntro,
        Game_1,
        Day_1,
        EndScore,
    ],
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
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
