import Phaser from "phaser";
import { Player } from "../../objects/player";
import { Player_Arms } from "../../objects/player_arms";
import { Ingredient } from "../../objects/dish_ing";
import { Crate } from "../../objects/crate";
import { Stove } from "../../objects/stove";
import { Timer } from "../../objects/timer";
import { Orders } from "../../objects/orders";

export default class day1 extends Phaser.Scene {
    constructor() {
        super({ key: "day1" });
    }

    private dishes_made: number;
    private dishes_failed: number;
    private money_made: number;

    private mouseClicked: boolean;
    private player: Player;
    private player_arms: Player_Arms;
    private cursors: Phaser.Input.Keyboard.KeyboardPlugin | null;
    private timer: Timer;

    private stove: Stove;
    private itemGroup?: Phaser.Physics.Arcade.Group;
    private heldItem: Ingredient | null | undefined;
    private popup: Phaser.GameObjects.Container;
    private end_popup: Phaser.GameObjects.Container;

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
    private ba_crate: Crate;
    private bl_crate: Crate;
    private br_crate: Crate;
    private bu_crate: Crate;
    private eg_crate: Crate;
    private mi_crate: Crate;

    create() {
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
        this.ba_crate = this.crates[0];
        this.bl_crate = this.crates[1];
        this.br_crate = this.crates[2];
        this.bu_crate = this.crates[3];
        this.eg_crate = this.crates[4];
        this.mi_crate = this.crates[5];

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
        this.player.createAnims();
        this.player_arms = new Player_Arms({
            scene: this,
            x: this.player.x,
            y: this.player.y,
        });
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

        //Container stuff
        this.popup = this.add.container(0, 0);
        this.popup.setVisible(false);
        //Create order information elements.
        const bubbleGraphics = this.add.graphics();
        bubbleGraphics.fillStyle(0xffffff, 0.8); // white w transpareny
        bubbleGraphics.fillRoundedRect(0, 0, 165, 135, 10); // x, y, width, height, radius
        bubbleGraphics.lineStyle(2, 0x9dc183, 1); // line width, color, alpha
        bubbleGraphics.strokeRoundedRect(0, 0, 165, 135, 10);
        //Dish Image
        const image = this.add.image(7.5, 41, "BL_BR_BU_EG_MI");
        image.setOrigin(0, 0.5); // align left
        image.setScale(0.12); // scale of image
        //Add text next to the image
        const text = this.add.text(125, 45, "Blueberry\nFrench\nToast", {
            font: "bold 16px Bangers",
            color: "#355E3B",
        });
        text.setOrigin(0.5, 0.5); // centers text
        //Adds bullet points below the main text
        const bulletPoints = this.add.text(
            15,
            80,
            "• Blueberries\n• Bread       • Butter\n• Eggs         • Milk",
            {
                font: "14px Bangers",
                color: "#355E3B",
            }
        );
        bulletPoints.setOrigin(0, 0); //Align text to the left
        bulletPoints.setLineSpacing(2.5);
        this.popup.add([bubbleGraphics, image, text, bulletPoints]);
        this.popup.setSize(165, 135);

        //Timer
        //Note: Should always be created last, so that it is overlaid over everything.
        this.timer = new Timer(
            { scene: this, x: 552, y: 112, duration: 120 },
            () => {
                console.log("Timer completed!");
                this.end_popup = this.add.container(
                    this.cameras.main.displayWidth * 0.5,
                    this.cameras.main.displayHeight * 0.5
                );
            }
        );
    }

    //Helper functions
    resetClicked() {
        this.player_arms.overlapping = false;
        this.player_arms.stoveOverlap = false;
        this.player_arms.crateOverlap = false;
        if (!this.input.mousePointer.leftButtonDown()) {
            this.mouseClicked = false;
        }
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
                this.showOrderInfo(touchedOrder);
                console.log("Order dish name: ", touchedOrder.dish_texture);
                if (this.heldItem) {
                    console.log("Held item name: ", this.heldItem.name);
                }

                if (
                    this.input.mousePointer.leftButtonDown() &&
                    this.heldItem &&
                    !this.mouseClicked
                ) {
                    if (this.heldItem.name === touchedOrder.dish_texture) {
                        touchedOrder.destroy();
                        this.heldItem.destroy();
                        this.heldItem = null;
                        this.player_arms.hasItem = false;
                        this.mouseClicked = true;
                    }
                }
            }
        } else {
            this.popup.setVisible(false);
        }
    }
    //Show order popup. Hide order popup.
    showOrderInfo(order: Orders) {
        console.log("Showing order!");
        //Update dish texture.
        (this.popup.getAt(1) as Phaser.Physics.Arcade.Image).setTexture(
            order.dish_texture
        );
        //Update dish name.
        const text = this.popup.getAt(2) as Phaser.GameObjects.Text;
        text.setText(order.dish_name.replace(/ /g, "\n"));
        //Update recipes.
        const bpoints = this.popup.getAt(3) as Phaser.GameObjects.Text;
        bpoints.setText(order.parts);

        const x = this.cameras.main.width - 165 - 7.5; // 240 = width of bubble, 10 = margin
        const y = this.cameras.main.height - 135 - 7.5; // 100 = height of bubble, 10 = margin
        this.popup.setPosition(x, y);
        this.popup.setVisible(true);
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
        //Reset clicked boolean
        this.resetClicked();
        this.crates.forEach((crate) => {
            crate.crateTouched = false;
        });
        this.player_arms.crateOverlap = false;
        this.orderses.forEach((orders) => {
            orders.ordersTouched = false;
        });
        this.player_arms.ordersOverlap = false;
    }
}
