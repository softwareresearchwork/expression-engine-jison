var app = angular.module('app', []);

app.controller("ExpressionController", function ExpressionController($scope) {

	for ( var key in dataStructures) {
		if (dataStructures.hasOwnProperty(key)) {
			parser.yy[key] = dataStructures[key];
		}
	}

	$scope.data = {};

	$scope.data.variables = {
		a : 0,
		b : 0,
		c : 0,
		d : 0,
		e : 0,
		f : 0,
		g : 0,
		h : 0,
		i : 0
	};

	var dummyEvaluator = {
		evaluate : function() {
			// Do Nothing
		}
	};

	$scope.evaluator = dummyEvaluator;

	$scope.parse = function() {
		try {
			$scope.evaluator = parser.parse($scope.data.expression);
			$scope.data.errorMessage = "";
			$scope.reevaluate();
		} catch (e) {
			$scope.evaluator = dummyEvaluator;
			$scope.data.errorMessage = e.message;
		}
	};

	$scope.reevaluate = function() {
		$scope.evaluator.evaluate($scope.data.variables);
	};
});