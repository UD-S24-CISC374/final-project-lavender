import Phaser from "phaser";
//import { Order } from "./orders";

export class Conveyor extends Phaser.Physics.Arcade.Image {
    static orderAlgo(strategy: number) {
        //Strat. number determines which algorithm is being used.
        //Generate algorithms.
        //0 = FIFO, 1 = SJN, 2 = Priority (money)
        if (strategy == 0) {
            //
        } else if (strategy == 1) {
            //
        } else if (strategy == 2) {
            //
        }
    }
}
