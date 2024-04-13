import Phaser from "phaser";
import { Player } from "../objects/player";
import { Player_Arms } from "../objects/player_arms";

export type Collidable =
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Tilemaps.Tile;

export default class game_1 extends Phaser.Scene {
    constructor() {
        super({ key: "game_1" });
    }

    target = 0;
    private player: Player;
    private player_arms: Player_Arms;
    private cursors: Phaser.Input.Keyboard.KeyboardPlugin | null;

    private tomato?: Phaser.Physics.Arcade.Group;
    //private score = 0;
    //private scoreText?: Phaser.GameObjects.Text;

    preload() {
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
    }

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
        this.cursors = this.input.keyboard;
        this.player = new Player({
            scene: this,
            x: this.cameras.main.displayWidth / 2,
            y: this.cameras.main.displayHeight / 2,
        });
        this.player.createAnims();
        this.player_arms = new Player_Arms({
            scene: this,
            x: this.player.x,
            y: this.player.y,
        });
        this.player_arms.createAnims();
    }

    update() {
        var targetAngle =
            Phaser.Math.RAD_TO_DEG *
            Phaser.Math.Angle.Between(
                this.player_arms.x,
                this.player_arms.y,
                this.game.input.activePointer.x,
                this.game.input.activePointer.y
            );
        if (this.input.mousePointer.leftButtonDown()) {
            this.player_arms.grabObject(targetAngle);
        } else {
            this.player_arms.anims.play("idle");
            this.player_arms.setAngle(0);
        }

        //this.player.movePlayer(this.player_arms);
        //Movement
        this.player.setVelocity(0);
        this.player_arms.setVelocity(0);
        if (
            this.cursors?.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown ||
            this.cursors?.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown ||
            this.cursors?.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown ||
            this.cursors?.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown
        ) {
            if (this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
                this.player.setVelocityX(-300);
                this.player_arms.setVelocityX(-300);
                this.player.flipX = true;
            } else if (
                this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown
            ) {
                this.player.setVelocityX(300);
                this.player_arms.setVelocityX(300);
                this.player.flipX = false;
            }
            if (this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
                this.player.setVelocityY(-300);
                this.player_arms.setVelocityY(-300);
            } else if (
                this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown
            ) {
                this.player.setVelocityY(300);
                this.player_arms.setVelocityY(300);
            }
            this.player.anims.play("move", true);
        } else {
            this.player.anims.play("idle", true);
        }
    }
}
