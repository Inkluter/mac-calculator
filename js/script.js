
  var calculator = {
    firstNum: 0,
    secondNum: 0,
    action: '',
    state: 1, // state 1 means that we enter first number to calculate

    input: document.getElementById('numbersInput'),
    
    
    // setting
    setInputValue: function(val) {
      this.input.value = val;
    },
    

    // base actions
    getSum: function(a, b) {
      return a + b;
    },
    getDiff: function(a, b) {
      return a - b;
    },
    getMultiplie: function(a, b) {
      return a * b;
    },
    getSplit: function(a, b) {
      return a / b;
    },
    setSecondNumberState: function() {
      this.state = 2;
    },
    

    // listeners
    setNumberButtonListeners: function() {
      var numberButtonsList = document.getElementsByClassName('number-button');
      var that = this;

      for (var i=0;i<numberButtonsList.length;i++){

        numberButtonsList[i].addEventListener('click', function(){
          var buttonNum = this.dataset.num;

          if (that.state == 1) {
            that.firstNum += buttonNum;
            that.setInputValue(that.firstNum);
          } else if (that.state == 2) {
            that.secondNum += buttonNum;
            that.setInputValue(that.secondNum);
          };
        });
      };
    },
    setReset: function() {
      var that = this;

      document.getElementById('resetButton').addEventListener('click', function(){
        that.input.value = 0;
        that.action = '';
        that.state = 1;
        that.firstNum = 0;
        that.secondNum = 0;
      });
    },
    setPlus: function() {
      var that = this;

      document.getElementById('plusButton').addEventListener('click', function(){
        that.firstNum = parseInt(that.input.value);
        that.setSecondNumberState();
        that.action = 'plus';
      });
    },
    setMinus: function() {
      var that = this;

      document.getElementById('minusButton').addEventListener('click', function(){
        that.firstNum = parseInt(that.input.value);
        
        that.setSecondNumberState();
        that.action = 'minus';        
      });
    },
    setMultiplie: function() {
      var that = this;

      document.getElementById('multiplieButton').addEventListener('click', function(){
        that.firstNum = parseInt(that.input.value);
        
        that.setSecondNumberState();
        that.action = 'multiplie';   
      });
    },
    setDivide: function() {
      var that = this;

      document.getElementById('divideButton').addEventListener('click', function(){
        that.firstNum = parseInt(that.input.value);
        
        that.setSecondNumberState();
        that.action = 'divide';   
      });
    },
    setEqual: function() {
      var that = this;
      
      document.getElementById('equalButton').addEventListener('click', function(){
        var result;
        var firstNumber = parseInt(that.firstNum);
        var secondNumber = parseInt(that.secondNum);

        if (that.action == 'plus') {
          result = that.getSum(firstNumber, secondNumber);
        } else if (that.action == 'minus') {
          result = that.getDiff(firstNumber, secondNumber);
        } else if (that.action == 'multiplie') {
          result = that.getMultiplie(firstNumber,secondNumber);
        } else if (that.action == 'divide') {
          result = that.getSplit(firstNumber, secondNumber);
        };

        that.setInputValue(result);
        that.firstNum = result;
      });
    },
    setPercentButton: function() {
      var that = this;

      document.getElementById('percentButton').addEventListener('click', function(){
        var percent = parseInt(that.firstNum)/100;

        that.setInputValue(percent);
        that.firstNum = percent;
      });
    },

    // init
    init: function() {
      this.setInputValue(this.firstNum);
      this.setNumberButtonListeners();

      this.setReset();
      this.setPlus();
      this.setMinus();
      this.setMultiplie();
      this.setDivide();
      this.setEqual();
      this.setPercentButton();
    }
  };
  // calculator.init();




  var calculatorView = {
    setInputValue: function(value) {
      var inputValue = this.input.value;
      var newValue = inputValue + value;

      if (newValue.length > 12) {
        return;
      };

      // replace first 0 symbol
      if (inputValue.length == 1 && inputValue.charAt(0)==0) {
        newValue = newValue.slice(1);
      };

      this.input.value = newValue;

      return value;
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
    plus: document.getElementById('plusButton'),
    dot: document.getElementById('dotButton')
  };




  var calculatorModel = {
    firstNumber: 0,
    secondNumber: 0,
    state: 1,
    action: ''
  };




  var calculatorControllerFactory = function(model, view, calcBL) {

    // number button
    for (var i=0;i<view.number.length;i++) {
      view.number[i].addEventListener('click', function() {
        var number = this.dataset.num;

        view.setInputValue(number);
      });
    };

    // dot button
    view.dot.addEventListener('click', function() {
      view.setDot();
    });

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
      model.firstNumber = view.getInputValue();
      model.state = 2;

      console.log(model.firstNumber);
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

