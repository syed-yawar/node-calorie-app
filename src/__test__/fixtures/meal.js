import UserFixture from './user';

export default class MealFixture {
    static returnSaveMealParam() {
        return { food: 'milk', calorie: 100, user: UserFixture.returnLoggedInUser() };
    }

    static returnMealObject() {
        return {
            _id: '612d07a01f56fce9b6092d04',
            food: 'butter1',
            calorie: 200,
            userId: '612b6b6f0ef45830a79ee662',
            date: '2021-08-30 22:53:51',
            __v: 0,
        };
    }

    static returnMealResponse() {
        return {
            date: '2021-08-30 22:53:51',
            _id: '612d07a01f56fce9b6092d04',
            userId: '612b6b6f0ef45830a79ee662',
            food: 'butter1',
            calorie: 200,
        };
    }
}
