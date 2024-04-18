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
        const tileset = map.addTilesetImage("Room_Builder_48x48", "tiles"); //Tilemap name, then key preloader name

        //Creates and randomizes tomato position.
        let x, y;
        const numOfObjects = 10;
        this.itemGroup = this.physics.add.group();
        for (let i = 0; i < numOfObjects; i++) {
            x = Phaser.Math.RND.between(20, 1180);
            y = Phaser.Math.RND.between(50, 700);
            this.itemGroup.add(this.physics.add.sprite(x, y, "tomato"));
        }

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

        //Add overlap between player_arms and game objects.
        this.physics.add.overlap(
            this.player_arms,
            this.itemGroup,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (playerArms, item) => {
                (playerArms as Player_Arms).overlapping = true;
                //(playerArms as Player_Arms).hasItem = true;
                this.heldItem = item as Phaser.Physics.Arcade.Sprite;
            },
            (playerArms) => {
                return !(playerArms as Player_Arms).hasItem;
            },
            this
        );

        if (tileset) {
            //Tile Parameters
            const belowLayer = map.createLayer("Below Player", tileset, 0, 0);
            const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);

            //Set collision for tiles with collides key
            //belowLayer?.setCollisionByProperty({ collides: true });
            aboveLayer?.setCollisionByProperty({ collides: true });

            //Set scale & depth of layers
            belowLayer?.setScale(1);
            belowLayer?.setDepth(-2);
            aboveLayer?.setScale(1);
            aboveLayer?.setDepth(-1);

            //Set collision
            //if (belowLayer) {
            //    this.physics.add.collider(this.player, belowLayer);
            //}
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

        //GrabObjects function and associated math.
        if (!this.player_arms.hasItem) {
            // If player_arms is not holding an item.
            if (
                this.input.mousePointer.leftButtonDown() &&
                this.player_arms.overlapping &&
                !this.mouseClicked
            ) {
                //If LMB is clicked, and arms are overlapping, grab item.
                this.player_arms.hasItem = true;
                this.player_arms.flipY = true;
                this.player_arms.anims.play("grab");
                //Position item above the player.
                this.heldItem?.setPosition(this.player.x, this.player.y - 50);
                this.mouseClicked = true;
            } else {
                //If no item is grabbed/LMB not pressed
                this.player_arms.flipY = false;
                this.player_arms.anims.play("idle");
            }
        } else {
            //If holding item
            this.player_arms.flipY = true;
            this.player_arms.anims.play("grab");
            //Position above head.
            this.heldItem?.setPosition(this.player.x, this.player.y - 50);
            //If LMB released while holding item, drop it
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

        //Simple mouseclick check
        if (!this.input.mousePointer.leftButtonDown()) {
            this.mouseClicked = false;
        }
        this.player_arms.overlapping = false;
    }

    
}
