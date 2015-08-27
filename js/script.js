  // TODO
  // 1 - fractions
  // 2 - multilplie actions







  // VIEW
  // ----------------------------
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
    action: document.getElementsByClassName('action-button'),
    input: document.getElementById('numbersInput'),
    equal: document.getElementById('equalButton'),
    reset: document.getElementById('resetButton'),
    percent: document.getElementById('percentButton')
  };








  // MODEL
  // ----------------------------
  var calculatorModel = {
    firstNumber: 0,
    secondNumber: 0,
    state: 1,
    action: ''
  };









  // CONTROLLER
  // ----------------------------
  var calculatorControllerFactory = function(model, view, calcBL) {


    // this function check '0' symbol as first in umber and
    // make sure that number is not longer than 12
    function makeNumber(number, value) {

      var newNumber;

      // dot first
      if (number == 0 && value == '.') {
        newNumber = '0.';

        return newNumber;
      }

      // null
      if (number == 0 && value == 0) {
        return 0;
      };

      // only one dot symbol
      if (value == '.' && ~number.indexOf('.')) {
        return number;
      };

      // max length
      if (number.length > 11) {
        return number;
      };

      newNumber = number + value

      // null first replace
      if (number === 0) {
        newNumber = newNumber.slice(1);
      };

      return newNumber;
    };



    function makeEqual() {
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

      
      model.firstNumber = result
      model.secondNumber = 0;

      view.setInputValue(result);
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



    // set moel state
    function setModelState(state, action) {
      model.state = state;
      model.action = action;
    };



    // number button listeners
    for (var i=0; i<view.number.length; i++) {
      view.number[i].addEventListener('click', function() {
        var number = this.dataset.num;

        setModelNumber(number);
      });
    };


    
    // action button listeners
    for (var i=0; i<view.action.length; i++) {
      view.action[i].addEventListener('click', function() {
        var action = this.dataset.action;

        // make minus number as first
        if (action == 'minus' && model.firstNumber === 0) {
          setModelNumber('-');

          return;
        };

        if (model.state == 2) {
          makeEqual();
          setModelState(2, action);

          return;
        };

        setModelState(2, action);
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


    // percent button
    view.percent.addEventListener('click', function() {
      model.firstNumber = model.firstNumber/100;
      view.setInputValue(model.firstNumber);
    });


    // equal button
    view.equal.addEventListener('click', function() {
      if (model.state == 1) {
        return;
      };

      makeEqual();
      setModelState(1, '');
    });


    return {
      init: function() {
        view.setInputValue(0);

        return 0;
      }
    };
  };








  // BUSINESS LOGIC
  // ----------------------------
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

