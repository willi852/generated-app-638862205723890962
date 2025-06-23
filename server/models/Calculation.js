// This model could be expanded to store calculations in a database
class Calculation {
  constructor(expression, result) {
    this.expression = expression;
    this.result = result;
    this.timestamp = new Date();
  }
}

module.exports = Calculation;