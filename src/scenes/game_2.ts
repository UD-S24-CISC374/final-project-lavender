import Phaser from "phaser";
import { Player } from "../objects/player";
import { Player_Arms } from "../objects/player_arms";

export type Collidable =
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Tilemaps.Tile;

export default class game_2 extends Phaser.Scene {
    constructor() {
        super({ key: "game_2" });
    }

    private mouseClicked: boolean;
    private player: Player;
    private player_arms: Player_Arms;
    private cursors: Phaser.Input.Keyboard.KeyboardPlugin | null;

    private itemGroup?: Phaser.Physics.Arcade.Group;
    private heldItem: Phaser.Physics.Arcade.Sprite | null;

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
        //Creates tile and map.
        const map = this.make.tilemap({ key: "map_1" });
        const tileset = map.addTilesetImage("Room_Builder_48x48", "tiles");

        //Creates player input and player object.
        this.cursors = this.input.keyboard;
        this.player = new Player({
            scene: this,
            x: this.cameras.main.displayWidth / 2 - 20,
            y: this.cameras.main.displayHeight / 2,
            cursors: this.cursors,
        });
        this.player.createAnims();
        this.player_arms = new Player_Arms({
            scene: this,
            x: this.player.x,
            y: this.player.y,
        });
        this.player_arms.createAnims();

        if (tileset) {
            //Tile Parameters
            const belowLayer = map.createLayer("Below Player", tileset, 0, 0);
            const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);
            //Set collision for tiles with collides key
            aboveLayer?.setCollisionByProperty({ collides: true });
            //Set scale & depth of layers
            belowLayer?.setScale(1);
            belowLayer?.setDepth(-2);
            aboveLayer?.setScale(1);
            aboveLayer?.setDepth(-1);
            //Set collision
            if (aboveLayer) {
                this.physics.add.collider(this.player, aboveLayer);
                this.physics.add.collider(this.player_arms, aboveLayer);
            }
        }
    }

    update() {
        //Movement
        this.player.setVelocity(0);
        this.player_arms.setVelocity(0);
        this.player.movePlayer(this.player_arms);

        //Grab items, and reset click.
        if (!this.player_arms.hasItem) {
            if (
                this.input.mousePointer.leftButtonDown() &&
                this.player_arms.overlapping &&
                !this.mouseClicked
            ) {
                this.player_arms.hasItem = true;
                this.player_arms.flipY = true;
                this.player_arms.anims.play("grab");
                this.heldItem?.setPosition(this.player.x, this.player.y - 50);
                this.mouseClicked = true;
            } else {
                this.player_arms.flipY = false;
                this.player_arms.anims.play("idle");
            }
        } else {
            this.player_arms.flipY = true;
            this.player_arms.anims.play("grab");
            this.heldItem?.setPosition(this.player.x, this.player.y - 50);
            if (
                this.input.mousePointer.leftButtonDown() &&
                !this.mouseClicked
            ) {
                this.heldItem?.setY(this.player.y + 10);
                this.heldItem = null; //Clear referenced item
                this.player_arms.hasItem = false;
                this.mouseClicked = true;
            }
        }
        if (!this.input.mousePointer.leftButtonDown()) {
            this.mouseClicked = false;
        }
        this.player_arms.overlapping = false;
    }
}
