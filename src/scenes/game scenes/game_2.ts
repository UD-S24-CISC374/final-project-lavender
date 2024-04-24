import Phaser from "phaser";
import { Player } from "../../objects/player";
import { Player_Arms } from "../../objects/player_arms";
import { Ingredient } from "../../objects/dish_ing";
import { Stove } from "../../objects/stove";

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

    private stove: Stove;
    private itemGroup?: Phaser.Physics.Arcade.Group;
    private heldItem: Ingredient | null;

    create() {
        //Creates tile and map.
        const map = this.make.tilemap({ key: "map_1" });
        const tileset = map.addTilesetImage("Room_Builder_48x48", "tiles");

        //Creates stove object.
        this.stove = new Stove({
            scene: this,
            x: this.cameras.main.displayWidth / 2 - 40,
            y: this.cameras.main.displayHeight / 2 + 20,
        });
        this.stove.createAnims();

        //Create itemgroup
        let x, y;
        const numOfObjects = 10;
        this.itemGroup = this.physics.add.group();
        for (let i = 0; i < numOfObjects; i++) {
            x = Phaser.Math.RND.between(30, 1170);
            y = Phaser.Math.RND.between(60, 690);
            this.itemGroup.add(
                new Ingredient({ scene: this, x: x, y: y }, "banana").setScale(
                    0.5
                )
            );
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
            (playerArms, item) => {
                (playerArms as Player_Arms).overlapping = true;
                this.heldItem = item as Ingredient;
            },
            (playerArms) => {
                return !(playerArms as Player_Arms).hasItem;
            },
            this
        );
        //Add overlap between player_arms and stove.
        this.physics.add.overlap(
            this.player_arms,
            this.stove,
            (playerArms) => {
                (playerArms as Player_Arms).stoveOverlap = true;
            },
            (playerArms) => {
                return !(playerArms as Player_Arms).stoveOverlap;
            },
            this
        );

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

        //Player is not holding an item.
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

                //Check to see if player is overlapping with stove.
                if (
                    this.input.mousePointer.leftButtonDown() &&
                    this.player_arms.stoveOverlap &&
                    !this.mouseClicked &&
                    !this.heldItem
                ) {
                    //Put in code here to start cooking of the item.
                    this.itemGroup?.add(this.stove.makeDish());
                }
                //this.stove.anims.play("off");
            }
            //Player is holding an item.
        } else {
            this.player_arms.flipY = true;
            this.player_arms.anims.play("grab");
            this.heldItem?.setPosition(this.player.x, this.player.y - 50);

            //If statement that checks if overlapping with stove.
            if (
                this.input.mousePointer.leftButtonDown() &&
                this.player_arms.stoveOverlap &&
                this.heldItem &&
                !this.mouseClicked
            ) {
                //Disable rendering of item, put in stove, prevent from being able to be interacted with.
                this.heldItem.setPosition(3000, 3000); //send item offscreen for now, will delete later
                this.stove.insertItem(this.heldItem);
                this.heldItem.disableBody(true, true);
                //Clear referenced item, set hasItem to false.
                this.heldItem = null;
                this.player_arms.hasItem = false;
                this.mouseClicked = true;
            } else if (
                this.input.mousePointer.leftButtonDown() &&
                !this.player_arms.stoveOverlap &&
                !this.mouseClicked
            ) {
                this.heldItem?.setY(this.player.y + 10);
                this.heldItem = null; //Clear referenced item
                this.player_arms.hasItem = false;
                this.mouseClicked = true;
            }
        }
        //Reset clicked boolean
        this.player_arms.overlapping = false;
        this.player_arms.stoveOverlap = false;
        if (!this.input.mousePointer.leftButtonDown()) {
            this.mouseClicked = false;
        }
    }
}
