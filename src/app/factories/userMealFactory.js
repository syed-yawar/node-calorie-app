/* eslint-disable arrow-parens */
import moment from 'moment';

export default class UserMealFactory {
    constructor(meals) {
        this.userMeals = [];
        meals.forEach((meal) => {
            meal.date = moment(meal.date).format('YYYY-MM-DD HH:mm:ss');
            const index = this.userMeals.findIndex((m) => moment(m.date).format('YYYY-MM-DD') === moment(meal.date).format('YYYY-MM-DD'));
            if (index === -1) {
                this.userMeals.push({ date: moment(meal.date).format('YYYY-MM-DD'), totalCalories: meal.calorie, meals: [meal] });
            } else {
                this.userMeals[index].totalCalories += +meal.calorie;
                this.userMeals[index].meals.push(meal);
            }
        });
    }

    static prepareData(meals) {
        const userMealFactoryObj = new UserMealFactory(meals);
        return userMealFactoryObj;
    }
}
