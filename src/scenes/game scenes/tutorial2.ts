import Phaser from "phaser";
import { Player } from "../../objects/player";
import { Player_Arms } from "../../objects/player_arms";

export type Collidable =
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Tilemaps.Tile;

export default class Tutorial2 extends Phaser.Scene {
    constructor() {
        super({ key: "Tutorial2" });
    }



}