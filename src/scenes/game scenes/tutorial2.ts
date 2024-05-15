import Phaser from "phaser";
import Result, { RESULT_DEFAULT } from "../../objects/results";

import { Player } from "../../objects/player";
import { Player_Arms } from "../../objects/player_arms";
import { Ingredient } from "../../objects/dish_ing";
import { Crate } from "../../objects/crate";
import { Stove } from "../../objects/stove";
import { Orders } from "../../objects/orders";

export type Collidable =
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Tilemaps.Tile;

export default class Tutorial2 extends Phaser.Scene {
    private result: Result;

    //Variables concerning input or the player.
    private mouseClicked: boolean;
    private player: Player;
    private player_arms: Player_Arms;
    private cursors: Phaser.Input.Keyboard.KeyboardPlugin | null;

    //Variables concerning popups, and informationals.
    private popup: Phaser.GameObjects.Container;
    private infoTextBackground: Phaser.GameObjects.Graphics;
    private infoText: Phaser.GameObjects.Text;
    private continueButton: Phaser.GameObjects.Text;

    //Variables concerning other game objects.
    private stove: Stove;
    private itemGroup?: Phaser.Physics.Arcade.Group;
    private heldItem: Ingredient | null | undefined;
    private orderses: Orders[] = [];
    private crates: Crate[] = [];
    private cratePositions = [
        { x: 80, y: 140, ingredient: "BA" },
        { x: 80, y: 210, ingredient: "BL" },
        { x: 80, y: 280, ingredient: "BR" },
        { x: 80, y: 350, ingredient: "BU" },
        { x: 80, y: 420, ingredient: "EG" },
        { x: 80, y: 490, ingredient: "MI" },
    ];

    constructor() {
        super({ key: "Tutorial2" });
        this.result = RESULT_DEFAULT;
    }

    init(data: Result) {
        this.result = data;
    }

    create() {
        //Sets result score.
        this.result = RESULT_DEFAULT;
        //Creates stove object.
        this.stove = new Stove({
            scene: this,
            x: this.cameras.main.displayWidth / 2 - 40,
            y: this.cameras.main.displayHeight / 2 + 20,
        });
        this.stove.createAnims();
        //Create initial orders objects.
        let x = 792;
        let y = 144;
        for (let i = 0; i < 3; i++) {
            this.orderses.push(
                new Orders({
                    scene: this,
                    x: x,
                    y: y,
                    num_order: i,
                })
            );
            y += 96;
        }
        //Create crates
        this.cratePositions.forEach((position) => {
            this.crates.push(
                new Crate({
                    scene: this,
                    x: position.x,
                    y: position.y,
                    ingredient: position.ingredient,
                })
            );
        });
        //Create itemgroup
        this.itemGroup = this.physics.add.group();
        //Creates player input and player object.
        this.cursors = this.input.keyboard;
        this.player = new Player({
            scene: this,
            x: this.cameras.main.displayWidth / 2 - 20,
            y: this.cameras.main.displayHeight / 2,
            cursors: this.cursors,
        });
        this.player_arms = new Player_Arms({
            scene: this,
            x: this.player.x,
            y: this.player.y,
        });
        this.player.createAnims();
        this.player_arms.createAnims();

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
        //Add overlap between player_arms and crates.
        this.crates.forEach((crate) => {
            this.physics.add.overlap(
                this.player_arms,
                crate,
                (playerArms) => {
                    (playerArms as Player_Arms).crateOverlap = true;
                    (crate as Crate).crateTouched = true;
                },
                (playerArms) => {
                    return !(playerArms as Player_Arms).crateOverlap;
                },
                this
            );
        });
        //Add overlap between player_arms and order group.
        this.orderses.forEach((orders) => {
            this.physics.add.overlap(
                this.player_arms,
                orders,
                (playerArms) => {
                    (playerArms as Player_Arms).ordersOverlap = true;
                    (orders as Orders).ordersTouched = true;
                },
                (playerArms) => {
                    return !(playerArms as Player_Arms).ordersOverlap;
                },
                this
            );
        });

        //Creates tile and map.
        const map = this.make.tilemap({ key: "map_d" });
        const tileset = map.addTilesetImage("Room_Builder_48x48", "tiles");
        const tileset_2 = map.addTilesetImage("Interiors_48x48", "i_tiles");
        if (tileset && tileset_2) {
            //Tile Parameters
            const floorLayer = map.createLayer("Floor", tileset, 0, 0);
            const obj1Layer = map.createLayer("Objects_Below", tileset_2, 0, 0);
            const wallLayer = map.createLayer("Walls", tileset, 0, 0);
            //Set collision for tiles with collides key
            obj1Layer?.setCollisionByProperty({ collides: true });
            wallLayer?.setCollisionByProperty({ collides: true });
            //Set scale & depth of layers
            floorLayer?.setScale(1);
            floorLayer?.setDepth(-20);
            obj1Layer?.setScale(1);
            obj1Layer?.setDepth(-19);
            wallLayer?.setScale(1);
            wallLayer?.setDepth(-18);
            //Set collision
            if (obj1Layer) {
                this.physics.add.collider(this.player, obj1Layer);
                this.physics.add.collider(this.player_arms, obj1Layer);
            }
            if (wallLayer) {
                this.physics.add.collider(this.player, wallLayer);
                this.physics.add.collider(this.player_arms, wallLayer);
            }
        }

        //Initialize Popup (in orders.ts)
        this.popup = Orders.initializePopup(this);

        const textBoxWidth = 500;
        const textBoxHeight = 130;
        const startX = (this.cameras.main.width - textBoxWidth) / 2;
        const startY = this.cameras.main.height - textBoxHeight - 10;

        const graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 0.7);
        graphics.fillRoundedRect(
            startX,
            startY,
            textBoxWidth,
            textBoxHeight,
            15
        );

        this.add
            .text(
                startX + textBoxWidth / 2,
                startY + textBoxHeight / 2,
                "1. Walk up to the orders in the top left\n2. Walk up to your ingredients, tap for the one you want\n3. Carry it to the pot & click to add\n4. Stand over the pot and click to get your final order\n5. Bring it to the reciept!",
                {
                    font: "21px Bangers",
                    color: "#000000",
                }
            )
            .setOrigin(0.5, 0.5);

        // Button dimensions and position
        const buttonX = 940;
        const buttonY = 410;
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
            this.scene.start("LevelSelect");
        });
    }

    //Helper functions
    resetAll() {
        this.player_arms.overlapping = false;
        this.player_arms.stoveOverlap = false;
        this.player_arms.crateOverlap = false;
        if (!this.input.mousePointer.leftButtonDown()) {
            this.mouseClicked = false;
        }
        this.crates.forEach((crate) => {
            crate.crateTouched = false;
        });
        this.player_arms.crateOverlap = false;
        this.orderses.forEach((orders) => {
            orders.ordersTouched = false;
        });
        this.player_arms.ordersOverlap = false;
    }
    pickupItem(pickingUp: boolean) {
        if (pickingUp) {
            this.player_arms.hasItem = true;
            this.player_arms.playAnims(true);
            this.heldItem?.setPosition(this.player.x, this.player.y - 50);
            this.mouseClicked = true;
        } else {
            //Holding item
            this.player_arms.playAnims(true);
            this.heldItem?.setPosition(this.player.x, this.player.y - 50);
        }
    }
    interactWithStove() {
        if (
            this.input.mousePointer.leftButtonDown() &&
            this.player_arms.stoveOverlap &&
            this.stove.inStove.length > 0 &&
            !this.mouseClicked &&
            !this.heldItem
        ) {
            this.itemGroup?.add(this.stove.makeDish());
            this.result.dishes_made++;
        }
    }
    interactWithCrates() {
        if (
            this.input.mousePointer.leftButtonDown() &&
            this.player_arms.crateOverlap &&
            !this.mouseClicked
        ) {
            let touchedCrate: Crate | undefined;
            this.crates.forEach((crate) => {
                if (crate.crateTouched) {
                    touchedCrate = crate;
                    crate.crateTouched = false;
                }
            });
            if (touchedCrate) {
                touchedCrate.createIngredient(
                    this.itemGroup,
                    touchedCrate.name
                );
            }
        }
    }
    interactWithOrders() {
        if (this.player_arms.ordersOverlap) {
            let touchedOrder: Orders | undefined;
            this.orderses.forEach((orders) => {
                if (orders.ordersTouched) {
                    touchedOrder = orders;
                    orders.ordersTouched = false;
                }
            });
            if (touchedOrder) {
                Orders.showOrderInfo(this, this.popup, touchedOrder);

                if (
                    this.input.mousePointer.leftButtonDown() &&
                    this.heldItem &&
                    typeof this.heldItem.name === "string" && // Check if name is a string
                    typeof touchedOrder.dish_texture === "string" && // Check if dish_texture
                    !this.mouseClicked
                ) {
                    if (this.heldItem.name === touchedOrder.dish_texture) {
                        touchedOrder.destroy();
                        this.heldItem.destroy();
                        this.heldItem = null;
                        this.player_arms.hasItem = false;
                        this.mouseClicked = true;
                        this.result.money_made += 0.25;
                    }
                }
            }
        } else {
            this.popup.setVisible(false);
        }
    }

    update() {
        //Movement
        this.player.setVelocity(0);
        this.player_arms.setVelocity(0);
        this.player.movePlayer(this.player_arms);

        //Check if overlapping with an order.
        if (this.player_arms.ordersOverlap) {
            this.interactWithOrders();
        } else {
            this.popup.setVisible(false);
        }

        //Left mouse button is down
        const leftButtonDown = this.input.mousePointer.leftButtonDown();
        //Player is not holding an item.
        if (!this.player_arms.hasItem) {
            if (
                leftButtonDown &&
                this.player_arms.overlapping &&
                !this.mouseClicked
            ) {
                this.pickupItem(true);
            } else {
                this.player_arms.playAnims(false);
                //Check to see if player clicked to interact with stove.
                this.interactWithStove();
                this.interactWithCrates();
                this.mouseClicked = true;
            }
        } else {
            //Player is holding an item.
            this.pickupItem(false);

            //If statement that checks if overlapping with stove.
            if (
                leftButtonDown &&
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
                leftButtonDown &&
                !this.player_arms.stoveOverlap &&
                !this.mouseClicked
            ) {
                this.heldItem?.setY(this.player.y + 10);
                this.heldItem = null; //Clear referenced item
                this.player_arms.hasItem = false;
                this.mouseClicked = true;
            }
        }
        //Reset booleans
        this.resetAll();
    }
}
