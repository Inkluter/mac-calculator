(function(){
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
        };

        that.setInputValue(result);
      });
    },

    // init
    init: function() {
      this.setInputValue(this.firstNum);
      this.setNumberButtonListeners();

      this.setReset();
      this.setPlus();
      this.setMinus();
      this.setEqual();
    }
  };


  
  calculator.init();
})();