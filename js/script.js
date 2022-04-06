 var myCards = document.getElementById('container');
 var reset = document.getElementById('reset');
 var text = document.getElementById('text-time');  
 var appendTens = document.getElementById("tens");  
 var appendSeconds = document.getElementById("seconds");  
 var resultsArray = [];  
 var counter = 0;  
 var seconds = 00;   
 var tens = 00;   
 var Interval ;  
 var images = [  
  'angular',   
  'git',   
  'javascript',   
  'css',   
  'html'  
 ];  
 var clone = images.slice(0); // duplicate array  
 var cards = images.concat(clone); // merge to arrays   
 
 shuffle(cards);
 startGame();
 
 // Shuffle function 
 function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

function startGame(){
    for (var i = 0; i < cards.length; i++) {  
      let card = document.createElement('div');  
      card.dataset.item = cards[i];  
      card.dataset.view = "card";  
      myCards.appendChild(card);  
      card.onclick = function () {
        reset.style.display = "inline"
       if (this.className != 'flipped' && this.className != 'correct'){  
         this.className = 'flipped';  
         var result = this.dataset.item;  
         resultsArray.push(result);  
         clearInterval(Interval);  
         Interval = setInterval(startTimer, 10);  
       }  
       if (resultsArray.length > 1) {  
        if (resultsArray[0] === resultsArray[1]) {  
         check("correct");  
         counter ++;  
         win();  
         resultsArray = [];  
        } else {  
         check("reverse");  
         resultsArray = [];  
        }  
       }  
      }  
    }
}

var check = function(className) {  
  var x = document.getElementsByClassName("flipped");  
  setTimeout(function() {  
   for(var i = (x.length - 1); i >= 0; i--) {  
    x[i].className = className;  
   }  
  }, 500);  
}

var win = function () {  
  if(counter === 5) {  
   clearInterval(Interval);  
   text.innerHTML = "Tu tiempo fue " + seconds + ":" + tens;  
  }   
}

function resetGame() {
    while (myCards.hasChildNodes()) {
        myCards.removeChild(myCards.firstChild);
    }
    clearInterval(Interval);
    reset.style.display = "none"
    text.innerHTML = '';
    counter = 0;  
    seconds = 00;   
    tens = 00; 
    appendTens.innerHTML = "00"
    appendSeconds.innerHTML = "00"
    shuffle(cards)
    startGame();
}

function startTimer () {  
  tens++;   
  if(tens < 9){  
   appendTens.innerHTML = "0" + tens;  
  }  
  if (tens > 9){  
   appendTens.innerHTML = tens;  
  }   
  if (tens > 99) {  
   seconds++;  
   appendSeconds.innerHTML = "0" + seconds;  
   tens = 0;  
   appendTens.innerHTML = "0" + 0;  
  }  
  if (seconds > 9){  
   appendSeconds.innerHTML = seconds;  
  }  
}