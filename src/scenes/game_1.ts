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

    private mouseClicked: boolean;
    private player: Player;
    private player_arms: Player_Arms;
    private cursors: Phaser.Input.Keyboard.KeyboardPlugin | null;

    private itemGroup?: Phaser.Physics.Arcade.Group;
    private heldItem: Phaser.Physics.Arcade.Sprite | null;
    //private score = 0;
    //private scoreText?: Phaser.GameObjects.Text;

    private popupVisible: boolean = true;
    private textBackground: Phaser.GameObjects.Rectangle;
    private instructions: Phaser.GameObjects.Text;

    private secondPopupVisible: boolean = false;
    private secondTextBackground: Phaser.GameObjects.Rectangle;
    private secondInstructions: Phaser.GameObjects.Text;

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

        const textBoxWidth = 700;
        const textBoxHeight = 100;
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;
        const textYPosition = screenHeight - textBoxHeight - 50; //adjust Y position of text box, move up 100 pixels

        // transparent rectangle for text background
        this.textBackground = this.add
            .rectangle(
                screenWidth / 2, // X position (center of the screen)
                textYPosition,
                textBoxWidth, // Width of the rectangle
                textBoxHeight, // Height of the rectangle
                0x6495ed, // Color of the rectangle (black)
                0.5 // Transparency of the rectangle
            )
            .setDepth(100); //set in front of objects

        //WASD text instructions
        this.instructions = this.add
            .text(
                screenWidth / 2, // X position (center of the screen)
                textYPosition,
                "Try pressing WASD to move around", // Text to display
                {
                    font: "bold 40px Arial",
                    color: "#ffffff",
                    align: "center",
                }
            )
            .setOrigin(0.5)
            .setDepth(100); // set in front of objects

        this.textBackground.setVisible(this.popupVisible);
        this.instructions.setVisible(this.popupVisible);

        // Second set of text
        this.secondTextBackground = this.add
            .rectangle(
                screenWidth / 2,
                textYPosition - 150, // Positioned slightly above the first text
                textBoxWidth,
                textBoxHeight,
                0x6495ed,
                0.5
            )
            .setDepth(100)
            .setVisible(false); // Initially invisible

        this.secondInstructions = this.add
            .text(
                screenWidth / 2,
                textYPosition - 150,
                "Try picking up a tomato by clicking your mouse",
                {
                    font: "bold 30px Arial",
                    color: "#ffffff",
                    align: "center",
                }
            )
            .setOrigin(0.5)
            .setDepth(100)
            .setVisible(false);

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

            //Graphics Debugger
            const debugGraphics = this.add.graphics().setAlpha(0.75);
            if (aboveLayer) {
                aboveLayer.renderDebug(debugGraphics, {
                    tileColor: null, // Color of non-colliding tiles
                    collidingTileColor: new Phaser.Display.Color(
                        243,
                        134,
                        48,
                        255
                    ), // Color of colliding tiles
                    faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
                });
            }
        }
    }

    update() {
        //Movement
        this.player.setVelocity(0);
        this.player_arms.setVelocity(0);
        if (
            this.popupVisible &&
            (this.cursors?.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown ||
                this.cursors?.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown ||
                this.cursors?.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown ||
                this.cursors?.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown)
        ) {
            this.popupVisible = false;
            this.tweens.add({
                targets: [this.textBackground, this.instructions],
                alpha: { from: 1, to: 0 },
                duration: 5000,
                onComplete: () => {
                    this.textBackground.destroy();
                    this.instructions.destroy();
                    this.fadeInSecondText();
                },
            });
        }
        if (
            this.cursors?.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown ||
            this.cursors?.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown ||
            this.cursors?.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown ||
            this.cursors?.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown
        ) {
            if (this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
                this.player.setVelocityX(-230);
                this.player_arms.setVelocityX(-230);
                this.player.flipX = true;
            } else if (
                this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown
            ) {
                this.player.setVelocityX(230);
                this.player_arms.setVelocityX(230);
                this.player.flipX = false;
            }
            if (this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
                this.player.setVelocityY(-230);
                this.player_arms.setVelocityY(-230);
            } else if (
                this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown
            ) {
                this.player.setVelocityY(230);
                this.player_arms.setVelocityY(230);
            }
            this.player.anims.play("move", true);
        } else {
            this.player.anims.play("idle", true);
        }

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
                this.heldItem?.setPosition(this.player.x, this.player.y - 40);
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
            this.heldItem?.setPosition(this.player.x, this.player.y - 40);
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
    fadeInSecondText() {
        this.secondPopupVisible = true;
        this.secondTextBackground.setVisible(true);
        this.secondInstructions.setVisible(true);
        this.tweens.add({
            targets: [this.secondTextBackground, this.secondInstructions],
            alpha: { from: 0, to: 1 },
            duration: 5000,
        });
    }
}
