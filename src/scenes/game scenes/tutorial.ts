import Phaser from "phaser";
import { Player } from "../../objects/player";
import { Player_Arms } from "../../objects/player_arms";

export type Collidable =
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Tilemaps.Tile;

export default class Tutorial extends Phaser.Scene {
    constructor() {
        super({ key: "Tutorial" });
    }

    private mouseClicked: boolean;
    private player: Player;
    private player_arms: Player_Arms;
    private cursors: Phaser.Input.Keyboard.KeyboardPlugin | null;

    private itemGroup?: Phaser.Physics.Arcade.Group;
    private heldItem: Phaser.Physics.Arcade.Sprite | null;

    private popupVisible: boolean = true;
    private textBackground: Phaser.GameObjects.Rectangle;
    private instructions: Phaser.GameObjects.Text;

    private secondPopupVisible: boolean = false;
    private secondTextBackground: Phaser.GameObjects.Rectangle;
    private secondInstructions: Phaser.GameObjects.Text;

    private thirdTextBackground: Phaser.GameObjects.Rectangle;
    private thirdInstructions: Phaser.GameObjects.Text;

    private continueButton: Phaser.GameObjects.Text;

    private buttonSound: Phaser.Sound.BaseSound;



    create() {

        this.buttonSound = this.sound.add("buttonSound");
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
                0x6495ed, // Color of the rectangle
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
                    font: "bold 40px Bangers",
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
                textYPosition,
                textBoxWidth * 1.2,
                textBoxHeight,
                0x6495ed,
                0.5
            )
            .setDepth(100)
            .setVisible(false); // Initially invisible

        this.secondInstructions = this.add
            .text(
                screenWidth / 2,
                textYPosition,
                "Pick up and drop items by standing on them & \nclicking your mouse anywhere on the screen",
                {
                    font: "bold 30px Bangers",
                    color: "#ffffff",
                    align: "center",
                }
            )
            .setOrigin(0.5)
            .setDepth(100)
            .setVisible(false);

        const textYPositionThird = this.cameras.main.height / 2; // Adjust position based on layout

        // third text background
        this.thirdTextBackground = this.add
            .rectangle(
                this.cameras.main.width / 2,
                textYPositionThird,
                700, // Width of the rectangle
                100, // Height of the rectangle
                0x6495ed, // Color of the rectangle (dark blue)
                0.5 // Transparency of the rectangle
            )
            .setDepth(100)
            .setVisible(false);

        // third text instruction
        this.thirdInstructions = this.add
            .text(
                this.cameras.main.width / 2,
                textYPositionThird,
                "Great work!",
                {
                    font: "bold 40px Bangers",
                    color: "#ffffff",
                    align: "center",
                }
            )
            .setOrigin(0.5)
            .setDepth(101)
            .setVisible(false);

        // Button dimensions and position
        const buttonX = 950;
        const buttonY = 550;
        const buttonWidth = 150;
        const buttonHeight = 56;
        const cornerRadius = 25;

        // Graphics object for the button
        const buttonGraphics = this.add.graphics();
        buttonGraphics.fillStyle(0xadd8e6, 0.8);
        buttonGraphics.fillRoundedRect(
            buttonX,
            buttonY,
            buttonWidth,
            buttonHeight,
            cornerRadius
        );
        buttonGraphics.lineStyle(2, 0xffffff, 1);
        buttonGraphics.strokeRoundedRect(
            buttonX,
            buttonY,
            buttonWidth,
            buttonHeight,
            cornerRadius
        );

        const hitArea = new Phaser.Geom.Rectangle(
            buttonX,
            buttonY,
            buttonWidth,
            buttonHeight
        );
        buttonGraphics.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);

        // text over the button
        this.continueButton = this.add
            .text(
                buttonX + buttonWidth / 2,
                buttonY + buttonHeight / 2,
                "Continue",
                {
                    font: "35px Bangers",
                    color: "#FFFFFF",
                    align: "center",
                    fixedWidth: buttonWidth,
                    fixedHeight: buttonHeight,
                    padding: {
                        top: 10,
                        bottom: 10,
                        left: 10,
                        right: 10,
                    },
                }
            )
            .setOrigin(0.5, 0.5)
            .setDepth(101)
            .setInteractive({ useHandCursor: true })
            .setVisible(true);

        // Add a click event listener to the button
        this.continueButton.on("pointerdown", () => {
            this.buttonSound.play();
            this.scene.start("Tutorial2");
        });

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
            (playerArms, item) => {
                (playerArms as Player_Arms).overlapping = true;
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
                duration: 3000,
                onComplete: () => {
                    this.textBackground.destroy();
                    this.instructions.destroy();
                    this.fadeInSecondText();
                },
            });
        }
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

    fadeInSecondText() {
        this.secondPopupVisible = true;
        this.secondTextBackground.setVisible(true);
        this.secondInstructions.setVisible(true);
        this.tweens.add({
            targets: [this.secondTextBackground, this.secondInstructions],
            alpha: { from: 0, to: 1 },
            duration: 3000,
            onComplete: () => {
                // Delay the call to fade out the text by 6000 milliseconds (6 seconds)
                this.time.delayedCall(9000, () => {
                    this.fadeOutSecondText();
                });
            },
        });
    }

    fadeOutSecondText() {
        this.tweens.add({
            targets: [this.secondTextBackground, this.secondInstructions],
            alpha: { from: 1, to: 0 },
            duration: 2000,
            onComplete: () => {
                this.secondTextBackground.setVisible(false);
                this.secondInstructions.setVisible(false);
                this.fadeInThirdText();
            },
        });
    }

    fadeInThirdText() {
        this.thirdTextBackground.setVisible(true);
        this.thirdInstructions.setVisible(true);
        this.tweens.add({
            targets: [this.thirdTextBackground, this.thirdInstructions],
            alpha: { from: 0, to: 1 },
            duration: 2000,
            onComplete: () => {
                this.continueButton.setVisible(true);
            },
        });
    }
}
