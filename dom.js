
var element = document.getElementById('element');

function callback() {
  alert('Hello');
}

// Add listener
element.addEventListener('click', callback);

//CUSTOM EVENTS
function EventTarget(){
    this._listeners = {};
}

EventTarget.prototype = {

    constructor: EventTarget,

    addListener: function(type, listener){
        if (typeof this._listeners[type] == "undefined"){
            this._listeners[type] = [];
        }

        this._listeners[type].push(listener);
    },

    fire: function(event){
        if (typeof event == "string"){
            event = { type: event };
        }
        if (!event.target){
            event.target = this;
        }

        if (!event.type){  //falsy
            throw new Error("Event object missing 'type' property.");
        }

        if (this._listeners[event.type] instanceof Array){
            var listeners = this._listeners[event.type];
            for (var i=0, len=listeners.length; i < len; i++){
                listeners[i].call(this, event);
            }
        }
    },

    removeListener: function(type, listener){
        if (this._listeners[type] instanceof Array){
            var listeners = this._listeners[type];
            for (var i=0, len=listeners.length; i < len; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }
};

var li = document.querySelector('li');

li.addEventListener('click', function(event) {
    debugger;
}, true);

// Listen for normal click events on
// the <li> and dispatch custom event
li.addEventListener('click', function(event) {
  var customEvent = new CustomEvent('mySpecialEvent', {
    bubbles: true,
    detail: { data: 'foo' }
  });
  
  event.currentTarget.dispatchEvent(customEvent);
});

// custom event should bubble, we can listen for it further up the DOM on the document.
document.addEventListener('mySpecialEvent', function(event) {
  alert(event.detail.data);
});
  
//Delegate Event Listener

var list = document.querySelector('ul');

list.addEventListener('click', function(event) {
  var target = event.target;

  while (target.tagName !== 'LI') {
    target = target.parentNode;
    if (target === list) return;
  }
});

//onbeforeunload
window.onbeforeunload = function(e) {
    return "Please don't leave";
  };

  //Resizing
var span = document.querySelector('span');

function update() {
  span.innerHTML = window.innerWidth + ' x ' + window.innerHeight;
}

update();

window.addEventListener('resize', update);

//PROMISES
//basic eg
var promise = new Promise(function(resolve, reject) {
    // do a thing, possibly async, then…
  
    if (/* everything turned out fine */) {
      resolve("Stuff worked!");
    }
    else {
      reject(Error("It broke"));
    }
  }); //he promise constructor takes one argument, a callback with two parameters, resolve and reject. 
  //do something within the callback, perhaps async, then call resolve if everything worked, otherwise call reject.

  //Async Funct Promise
  async function myFirstAsyncFunction() {
    try {
      const fulfilledValue = await promise;
    }
    catch (rejectedValue) {
      // …
    }
  }
  //example 2
  //normalfunction
  function divide (a, b) {
      return a/ b;
  }
  //turning it into a promise
  divide(a,b ), then(function (result) {
      console.log('Division Sucess: $(result)');
  }),catch(function (error){
      console.log('There was an error with the division');
      console.log(error);
  });

  //Dynamic Typing'
  let x = "world";
x = ["hello", x, "!"];
x = x.join(" ");
console.log(x) //outputs hello world !