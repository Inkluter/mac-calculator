(function(){
  var calculator = {
    firstNum: 0,
    secondNum: '',
    action: '',
    state: 1, // state 1 means that we enter first number to calculate
    
    
    setFirstNum: function(val) {
      this.firstNum += val;
    },
    
    
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
    
    
    setNumberButtonListeners: function() {
      var numberButtonsList = document.getElementsByClassName('number-button');
      
      for (var i=0;i<11;i++) {
        
        numberButtonsList[i].addEventListener('click', function(){
          var num = this.dataset.num;
          
          calculator.setFirstNum(num);
          
        });
      };
    },
    init: function() {
      this.setFirstNum(0);
      this.setNumberButtonListeners();
    }
  };

  
  calculator.init();
})();