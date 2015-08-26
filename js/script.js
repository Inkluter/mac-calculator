  // TODO
  // 1 - fractions
  // 2 - dot as first number
  // 3 - multilplie actions


  var calculatorView = {
    setInputValue: function(value) {


      this.input.value = value;
    },
    setDot: function() {
      var inputValue = this.input.value;

      if (inputValue.indexOf('.') > 0) {
        return;
      };

      var newValue = inputValue + '.';

      view.input.value = newValue;
    },
    getInputValue: function() {
      return parseInt(this.input.value);
    },
    number: document.getElementsByClassName('number-button'),
    input: document.getElementById('numbersInput'),
    equal: document.getElementById('equalButton'),
    reset: document.getElementById('resetButton'),
    percent: document.getElementById('percentButton'),
    divide: document.getElementById('divideButton'),
    multiplie: document.getElementById('multiplieButton'),
    minus: document.getElementById('minusButton'),
    plus: document.getElementById('plusButton')
  };




  var calculatorModel = {
    firstNumber: 0,
    secondNumber: 0,
    state: 1,
    action: ''
  };




  var calculatorControllerFactory = function(model, view, calcBL) {


    // this function check '0' symbol as first in umber and
    // make sure that number is not longer than 12
    function makeNumber(number, value) {

      var newNumber;

      if (number == 0 && value == 0) {
        return 0;
      };

      if (value == '.' && ~number.indexOf('.')) {
        return number;
      };

      if (number.length > 11) {
        return number;
      };

      newNumber = number + value

      if (number == 0) {
        newNumber = newNumber.slice(1);
      };

      return newNumber;
    };


    function setModelState(state, action) {
      model.state = state;
      model.action = action;
    };


    // check what number is typing and set it in calculator view
    function setModelNumber(value) {
      switch(model.state) {
        case 1:
        model.firstNumber = makeNumber(model.firstNumber, value);
        view.setInputValue(model.firstNumber);
        break;

        case 2:
        model.secondNumber = makeNumber(model.secondNumber, value);
        view.setInputValue(model.secondNumber);
        break;
      }
    };


    // number button listeners
    for (var i=0;i<view.number.length;i++) {
      view.number[i].addEventListener('click', function() {
        var number = this.dataset.num;

        setModelNumber(number);
      });
    };



    // reset button
    view.reset.addEventListener('click', function() {
      view.input.value = 0;
      model.firstNumber = 0;
      model.secondNumber = 0;
      model.state = 1;
      model.action = '';
    });


    // plus button
    view.plus.addEventListener('click', function() {
      setModelState(2, 'plus');
    });
    // minus button
    view.minus.addEventListener('click', function() {
      setModelState(2, 'minus');
    });
    // divide button
    view.multiplie.addEventListener('click', function() {
      setModelState(2, 'multiplie');
    });
    // multiplie button
    view.divide.addEventListener('click', function() {
      setModelState(2, 'divide');
    });


    // equal button
    view.equal.addEventListener('click', function() {
      var result;
      var firstNumber = parseFloat(model.firstNumber);
      var secondNumber = parseFloat(model.secondNumber);


      switch(model.action) {
        case 'plus':
          result = calcBL.plus(firstNumber, secondNumber);
          break;
        case 'minus':
          result = calcBL.minus(firstNumber, secondNumber);
          break;
        case 'multiplie':
          result = calcBL.multiplie(firstNumber, secondNumber);
          break;
        case 'divide':
          result = calcBL.divide(firstNumber, secondNumber);
          break;
      };

      setModelState(1, '');
      model.firstNumber = result
      model.secondNumber = 0;

      view.setInputValue(result);
    });


    return {
      init: function() {
        view.setInputValue(0);

        return 0;
      }
    };
  };




  var calculatorBLfactory = function(model) {

    return {
      plus: function(a, b) {
        var c = a + b;

        return c;
      },

      minus: function(a, b) {
        var c = a - b;

        return c;
      },

      multiplie: function(a, b) {
        var c = a * b;

        return c;
      },

      divide: function(a, b) {
        var c = a / b;

        return c;
      },
      percent: function(a) {
        var c = a/100;

        return c;
      }
    }; 
  };




  var model = calculatorModel;
  var view = calculatorView;
  var calcBL = calculatorBLfactory(model);
  var calculatorController = calculatorControllerFactory(model, view, calcBL);

  calculatorController.init();

