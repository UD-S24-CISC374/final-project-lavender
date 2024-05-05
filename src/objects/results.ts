export default interface Result {
    dishes_made: number;
    money_made: number;
}

export const RESULT_DEFAULT: Result = {
    dishes_made: 0,
    money_made: 0.0,
};
