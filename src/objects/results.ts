export default interface Result {
    dishes_made: number;
    wrong_orders: number;
    money_made: number;
}

export const RESULT_DEFAULT: Result = {
    dishes_made: 0,
    wrong_orders: 0,
    money_made: 0.0,
};
