(function(global) {
	"use strict";

	function Expressions(expression, expressions) {
		this.expression = expression;
		this.expressions = expressions;

		this.evaluate = function(data) {
			if (typeof this.expression !== "undefined") {
				this.expression.evaluate(data);
			}
			if (typeof this.expressions !== "undefined") {
				this.expressions.evaluate(data);
			}
		};
	}

	function Assignment(id, expression) {
		this.id = id;
		this.expression = expression;

		this.evaluate = function(data) {
			data[this.id] = expression.evaluate(data);
		};
	}

	function Conditional(logicalExpression, thenExpression, elseExpression) {
		this.logicalExpression = logicalExpression;
		this.thenExpression = thenExpression;
		this.elseExpression = elseExpression;

		this.evaluate = function(data) {
			if (this.logicalExpression.evaluate(data)) {
				this.thenExpression.evaluate(data);
			} else {
				if (typeof elseExpression !== "undefined") {
					this.elseExpression.evaluate(data);
				}
			}
		};
	}

	function LogicalExpression(operand1Expression, operator, operand2Expression) {
		this.operand1Expression = operand1Expression;
		this.operator = operator;
		this.operand2Expression = operand2Expression;

		this.evaluate = function(data) {
			switch (operator) {
			case '<':
				return operand1Expression.evaluate(data) < operand2Expression.evaluate(data);
			case '>':
				return operand1Expression.evaluate(data) > operand2Expression.evaluate(data);
			case '<=':
				return operand1Expression.evaluate(data) <= operand2Expression.evaluate(data);
			case '>=':
				return operand1Expression.evaluate(data) >= operand2Expression.evaluate(data);
			case '==':
				return operand1Expression.evaluate(data) === operand2Expression.evaluate(data);
			case '<>':
				return operand1Expression.evaluate(data) != operand2Expression.evaluate(data);
			case '&&':
				return operand1Expression.evaluate(data) && operand2Expression.evaluate(data);
			case '||':
				return operand1Expression.evaluate(data) || operand2Expression.evaluate(data);
			default:
				throw new Error("Unsupported Operator");
			}
		};
	}

	function MathExpression(operand1Expression, operator, operand2Expression) {
		this.operand1Expression = operand1Expression;
		this.operator = operator;
		this.operand2Expression = operand2Expression;

		this.evaluate = function(data) {
			switch (operator) {
			case '+':
				return operand1Expression.evaluate(data) + operand2Expression.evaluate(data);
			case '-':
				return operand1Expression.evaluate(data) - operand2Expression.evaluate(data);
			case '*':
				return operand1Expression.evaluate(data) * operand2Expression.evaluate(data);
			case '/':
				return operand1Expression.evaluate(data) / operand2Expression.evaluate(data);
			case '%':
				return operand1Expression.evaluate(data) % operand2Expression.evaluate(data);
			case '^':
				return operand1Expression.evaluate(data) ^ operand2Expression.evaluate(data);
			default:
				throw new Error("Unsupported Operator");
			}
		};
	}

	function UnaryOperator(operator, operandExpression) {
		this.operator = operator;
		this.operandExpression = operandExpression;

		this.evaluate = function(data) {
			switch (operator) {
			case "-":
				return -operandExpression.evaluate(data);
			default:
				throw new Error("Unsupported Operator");
			}
		};
	}

	function ParenExpression(expression) {
		this.expression = expression;

		this.evaluate = function(data) {
			return this.expression.evaluate(data);
		};
	}

	function Value(value) {
		this.value = value;

		this.evaluate = function(data) {
			return this.value;
		};
	}

	function Variable(id) {
		this.id = id;

		this.evaluate = function(data) {
			//TODO
			return Number(data[id]);
		};
	}

	var dataStructures = {
		Expressions : Expressions,
		Assignment : Assignment,
		Conditional : Conditional,
		LogicalExpression : LogicalExpression,
		MathExpression : MathExpression,
		UnaryOperator : UnaryOperator,
		ParenExpression : ParenExpression,
		Value : Value,
		Variable : Variable
	};

	if (typeof module === 'object' && module.exports) {
		module.exports = dataStructures;
	} else {
		global.dataStructures = dataStructures;
	}

})(this);