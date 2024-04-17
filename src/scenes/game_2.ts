import Phaser from "phaser";


export type Collidable =
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Tilemaps.Tile;

export default class game_2 extends Phaser.Scene {


    constructor() {
        super({ key: "game_2" });
    }



}