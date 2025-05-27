const BREAKFAST = 1, DINNER = 2, CAR_RENTAL = 3, LUNCH = 4;

class Breakfast {
    name = "Breakfast";
    limit = 1000;
}

class Dinner {
    name = "Dinner";
    limit = 5000;
}

class Lunch {
    name = "Lunch";
    limit = 2000;
}

class CarRental {
    name = "Car Rental";
    limit = null;
}

const expenseNameMap = {

}

function printReport(expenses) {
    let total = 0;
    let mealExpenses = 0;

    process.stdout.write("Expenses " + new Date().toISOString().slice(0, 10) + "\n");

    for (const expense of expenses) {
        if (expense.type == type.DINNER || expense.type == type.BREAKFAST || expense.type == type.LUNCH) {
            mealExpenses += expense.amount;
        }

        let expenseName;
        switch (expense.type) {
        case type.DINNER:
            expenseName = "Dinner";
            break;
        case type.BREAKFAST:
            expenseName = "Breakfast";
            break;
        case type.CAR_RENTAL:
            expenseName = "Car Rental";
            break;
        case type.LUNCH:
            expenseName = "Lunch";
            break;
        }

        const mealOverExpensesMarker = ((expense.type == type.DINNER && expense.amount > 5000) || (expense.type == type.LUNCH && expense.amount > 2000) || (expense.type == type.BREAKFAST && expense.amount > 1000)) ? "X" : " ";

        process.stdout.write(expenseName + "\t" + expense.amount + "\t" + mealOverExpensesMarker);
        total += expense.amount;
    }

    process.stdout.write("Meal expenses: " + mealExpenses);
    process.stdout.write("Total expenses: " + total);
}

printReport([{type: type.BREAKFAST, amount: 500}, {type: type.DINNER, amount: 6000}, {type: type.LUNCH, amount: 1000}, {type: type.LUNCH, amount: 3000}])
