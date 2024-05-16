import Phaser from "phaser";
import Result, { RESULT_DEFAULT } from "../../objects/results";

import { Player } from "../../objects/player";
import { Player_Arms } from "../../objects/player_arms";
import { Ingredient } from "../../objects/dish_ing";
import { Crate } from "../../objects/crate";
import { Stove } from "../../objects/stove";
import { Orders } from "../../objects/orders";
import { Conveyor } from "../../objects/conveyor";

//Price Priority (First in First Out)
export default class Tutorial2 extends Phaser.Scene {
    //Variable that holds the score.
    private result: Result;

    //Variables concerning input or the player.
    private mouseClicked: boolean;
    private player: Player;
    private player_arms: Player_Arms;
    private cursors: Phaser.Input.Keyboard.KeyboardPlugin | null;
    private continueButton: Phaser.GameObjects.Text;

    //Variables concerning popups, and informationals.
    private popup: Phaser.GameObjects.Container;

    //Variables concerning other game objects.
    private strategy: number;
    private stove: Stove;
    private conveyor: Conveyor;
    private itemGroup?: Phaser.Physics.Arcade.Group;
    private heldItem: Ingredient | null | undefined;
    private orderses: Orders[] = [];
    private orders_cnt: number;
    private crates: Crate[] = [];
    private cratePositions = [
        { x: 192, y: 132, ingredient: "BA" },
        { x: 192, y: 216, ingredient: "BL" },
        { x: 192, y: 300, ingredient: "BR" },
        { x: 192, y: 384, ingredient: "BU" },
        { x: 192, y: 468, ingredient: "EG" },
        { x: 192, y: 552, ingredient: "MI" },
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

        //Sets strategy (0 is FIFO, 1 is SJN, 2 is PRIORITY)
        this.strategy = 2;

        //Creates conveyor object
        this.conveyor = new Conveyor({
            scene: this,
            x: this.cameras.main.displayWidth / 2,
            y: 96,
        });
        //Creates stove object.
        this.stove = new Stove({
            scene: this,
            x: this.cameras.main.displayWidth / 2,
            y: this.cameras.main.displayHeight / 2 + 48,
        });
        //Create initial orders objects.
        let x = 980;
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
        this.orders_cnt = 3;
        //Create crates
        this.cratePositions.forEach((position) => {
            this.crates.push(
                new Crate({
                    scene: this,
                    x: position.x,
                    y: position.y,
                    ingredient: position.ingredient,
                }).setScale(1.2)
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

        //Create Animations
        this.conveyor.createAnims();
        this.stove.createAnims();
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
        //Add overlap between player_arms and conveyor.
        this.physics.add.overlap(
            this.player_arms,
            this.conveyor,
            (playerArms) => {
                (playerArms as Player_Arms).conveyorOverlap = true;
            },
            (playerArms) => {
                return !(playerArms as Player_Arms).conveyorOverlap;
            },
            this
        );

        //Creates tile and map.
        const map = this.make.tilemap({ key: "map_revamp" });
        const tileset = map.addTilesetImage("Room_Builder_48x48", "tiles");
        const tileset_2 = map.addTilesetImage("Generic_48x48", "g_tiles");
        if (tileset && tileset_2) {
            //Tile Parameters
            const fwLayer = map.createLayer("Floor & Walls", tileset, 0, 0);
            const bdLayer = map.createLayer("Border", tileset, 0, 0);
            const hlLayer = map.createLayer("Holes", tileset_2, 0, 0);
            const tbLayer = map.createLayer("Table", tileset_2, 0, 0);
            //Set collision for tiles with collides key
            fwLayer?.setCollisionByProperty({ collides: true });
            bdLayer?.setCollisionByProperty({ collides: true });
            hlLayer?.setCollisionByProperty({ collides: true });
            tbLayer?.setCollisionByProperty({ collides: true });
            //Set scale & depth of layers
            fwLayer?.setScale(1);
            fwLayer?.setDepth(-20);
            bdLayer?.setScale(1);
            bdLayer?.setDepth(-19);
            hlLayer?.setScale(1);
            hlLayer?.setDepth(-18);
            tbLayer?.setScale(1);
            tbLayer?.setDepth(-17);
            //Set collision
            if (fwLayer) {
                this.physics.add.collider(this.player, fwLayer);
                this.physics.add.collider(this.player_arms, fwLayer);
            }
            if (bdLayer) {
                this.physics.add.collider(this.player, bdLayer);
                this.physics.add.collider(this.player_arms, bdLayer);
            }
            if (tbLayer) {
                this.physics.add.collider(this.player, tbLayer);
                this.physics.add.collider(this.player_arms, tbLayer);
            }
        }

        //Initialize Popup (in orders.ts)
        this.popup = Orders.initializePopup(this);

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
                "1. Walk up to the orders in the top right.\n2. Walk up to your ingredients, tap for the one you want\n3. Carry it to the pot & click to add.\n4. Stand over the pot and click to get your final order\n5. Bring it to the conveyor to turn in!",
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
        this.player_arms.conveyorOverlap = false;
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
    generateMoreOrders() {
        let x = 980;
        let y = 144;
        if (this.orders_cnt <= 0) {
            //Add new orders.
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
            //Recreate collisions.
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
            this.orders_cnt = 3;
        }
    }
    orderAlgo(strategy: number) {
        // Check which order strategy is being used
        if (strategy === 0) {
            // Sort orders based on order number in ascending order
            this.orderses.sort((a, b) => a.num_order - b.num_order);
        } else if (strategy === 1) {
            // Sort orders based on the number of ingredients in ascending order
            this.orderses.sort((a, b) => a.num_ingredients - b.num_ingredients);
        } else if (strategy === 2) {
            // Sort orders based on price in descending order. (Higher price, higher priority)
            this.orderses.sort((a, b) => b.price_dec - a.price_dec);
        }
    }
    interactWithStove() {
        if (
            this.input.mousePointer.leftButtonDown() &&
            this.player_arms.stoveOverlap &&
            this.stove.inStove.length > 0 &&
            !this.mouseClicked &&
            !this.heldItem &&
            !this.stove.isCooking
        ) {
            //Play stove animation.
            this.stove.anims.play("on");
            this.stove.isCooking = true;

            // Add a delay before making the dish
            setTimeout(() => {
                // Make the dish
                this.itemGroup?.add(this.stove.makeDish());
                this.result.dishes_made++;

                // Stop the stove animation after making the dish
                this.stove.anims.play("off");
                this.stove.isCooking = false;
            }, 1000); //1000 = 1 second
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
            }
        } else {
            this.popup.setVisible(false);
        }
    }
    interactWithConveyor() {
        // Check if overlapping with conveyor and holding an item
        this.orderAlgo(this.strategy);
        if (
            this.player_arms.conveyorOverlap &&
            this.player_arms.hasItem &&
            this.heldItem &&
            this.input.mousePointer.leftButtonDown()
        ) {
            // Check if the held item matches any orders
            const matchingOrderIndex = this.orderses.findIndex(
                (order) => order.dish_texture === this.heldItem?.name
            );

            if (matchingOrderIndex !== -1) {
                const matchingOrder = this.orderses[matchingOrderIndex];
                // Check if the matched order is the first one based on the current strategy
                if (matchingOrderIndex === 0) {
                    // Delete the order and the held item
                    matchingOrder.destroy();
                    this.heldItem.destroy();
                    this.heldItem = null;
                    this.player_arms.hasItem = false;
                    this.orderses.splice(matchingOrderIndex, 1); // Remove the order from the array

                    // Increment the result (assuming you want to increment something)
                    this.result.money_made += matchingOrder.price_dec;
                    this.result.dishes_made++;
                    this.orders_cnt--;
                } else {
                    //Say that it was completed in wrong order.
                    this.heldItem.destroy();
                    this.heldItem = null;
                    this.player_arms.hasItem = false;
                }
            } else {
                //Delete object if doesn't match.
                this.heldItem.destroy();
                this.heldItem = null;
                this.player_arms.hasItem = false;
            }
            this.orderAlgo(this.strategy);
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

        //Check if player interacts with conveyor.
        this.interactWithConveyor();

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
        this.conveyor.anims.play("run", true);
        this.generateMoreOrders();
        this.resetAll();
    }
}
