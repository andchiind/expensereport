class BaseExpense {
  name;
  limit;
  #value;
  constructor(value) {
    this.#value = value;
  }
  isValid() {
    return this.#value <= this.limit;
  }

  toString() {
    const marker = this.isValid() ? "" : "\tX";
    return `${this.name}\t${this.#value}${marker}`;
  }
}

class Breakfast extends BaseExpense {
  name = "Breakfast";
  limit = 1000;
}

class Dinner extends BaseExpense {
  name = "Dinner";
  limit = 5000;
}

class Lunch extends BaseExpense{
  name = "Lunch";
  limit = 2000;
}

class CarRental extends BaseExpense{
  name = "Car Rental";
  limit = null;
}

const expenseNameMap = {};
ßß;
function printReport(expenses) {
  let total = 0;
  let mealExpenses = 0;

  process.stdout.write(
    "Expenses " + new Date().toISOString().slice(0, 10) + "\n",
  );

  for (const expense of expenses) {
    if (
      expense.type == type.DINNER ||
      expense.type == type.BREAKFAST ||
      expense.type == type.LUNCH
    ) {
      mealExpenses += expense.amount;
    }

    process.stdout.write(expense.toString());
    total += expense.amount;
  }

  process.stdout.write("Meal expenses: " + mealExpenses);
  process.stdout.write("Total expenses: " + total);
}

printReport([
  { type: type.BREAKFAST, amount: 500 },
  { type: type.DINNER, amount: 6000 },
  { type: type.LUNCH, amount: 1000 },
  { type: type.LUNCH, amount: 3000 },
]);
