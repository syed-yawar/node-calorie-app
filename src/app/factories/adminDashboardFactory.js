/* eslint-disable no-return-assign */
/* eslint-disable arrow-parens */
export default class AdminDashBoardFactory {
    constructor({ lastWeekMeals, previousWeekMeals, users }) {
        this.lastSevenDaysCount = lastWeekMeals.length;
        this.olderThanSevenDaysCount = previousWeekMeals.length;
        this.usersData = [];
        // need to find avg
        lastWeekMeals.forEach((meal) => {
            const index = this.usersData.findIndex((user) => user.userId === meal.userId);
            if (index === -1) {
                this.usersData.push({ userId: meal.userId, totalCalories: meal.calorie });
            } else {
                this.usersData[index].totalCalories += +meal.calorie;
            }
        });
        this.usersData.forEach((user) => {
            user.avg = parseFloat(user.totalCalories / 7).toFixed(2);
        });
        const remainingUsers = users.filter((user) => {
            const index = this.usersData.findIndex((u) => u.userId === `${user._id}`);
            return index === -1;
        });
        remainingUsers.forEach((user) => {
            this.usersData.push({ userId: user._id, totalCalories: 0, avg: 0 });
        });
    }

    static prepareData({ lastWeekMeals, previousWeekMeals, users }) {
        const adminDashboardFactory = new AdminDashBoardFactory({ lastWeekMeals, previousWeekMeals, users });
        return adminDashboardFactory;
    }
}
