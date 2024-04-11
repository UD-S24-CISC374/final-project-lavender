import Phaser from "phaser";
import { Player } from "../objects/player";

export type Collidable =
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Tilemaps.Tile;

export default class Game_1 extends Phaser.Scene {
    constructor() {
        super({ key: "Game_1" });
    }

    private player?: Player;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private tomato?: Phaser.Physics.Arcade.Group;

    private score = 0;
    private scoreText?: Phaser.GameObjects.Text;

    create() {
        //temporary image
        this.add.image(640, 280, "kitchen1");

        this.tomato = this.physics.add.group();
        for (let i = 0; i < 10; i++) {
            let x = Phaser.Math.RND.between(0, 1280);
            let y = Phaser.Math.RND.between(0, 720);
            this.tomato.create(x, y, "tomato");
        }

        //Creates player input and player object.
        this.cursors = this.input.keyboard?.createCursorKeys();
        this.player = new Player({
            scene: this,
            x: this.cameras.main.displayWidth / 2,
            y: this.cameras.main.displayHeight / 2,
            cursors: this.cursors,
        });

        //Animations for player.
        this.player.createAnims();
    }

    update() {
        this.player?.movePlayer();
    }
}
