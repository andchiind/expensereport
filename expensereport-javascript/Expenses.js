const  assert = require("node:assert");
class BaseExpense {
  name;
  limit;
  isMealExpense = true;
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

  amount() {
    return this.#value;
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
  isMealExpense = false;

  isValid() {
    return true
  }
}

process.stdout.writeln = (str) => process.stdout.write(str + "\n");

function printReport(expenses) {
  assert(Array.isArray(expenses));
  assert(expenses.every(x => x instanceof BaseExpense));

  let total = 0;
  let mealExpenses = 0;

  process.stdout.writeln(
    "Expenses " + new Date().toISOString().slice(0, 10),
  );

  for (const expense of expenses) {

    if (expense.isMealExpense) {
      mealExpenses += expense.amount();
    }
    
    process.stdout.writeln(expense.toString());
    total += expense.amount();
  }

  process.stdout.writeln("Meal expenses: " + mealExpenses);
  process.stdout.writeln("Total expenses: " + total);
}

// printReport();
printReport([
    new Breakfast(500),
    new Dinner(6000),
    new Lunch(1000),
    new Lunch(3000),
    new CarRental(1000000),
]);
