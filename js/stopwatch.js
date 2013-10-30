var stopWatch = stopWatch || {};

/**
*StopWatch module.
*Here time is tracked with help of a counter
*Time calculation is done by using the difference of starting time and stopping time
*/
stopWatch = function(){
	var elements = [];
	var _counter;
	var counter = function( elements ) {
		this.elements = elements; // for storing the dom input elements
		this.startT = 0;			// starting time
		this.endT = 0;				// stopping time
		this.currentTime = 0;		// total time elapsed. Used to store the time between the starting and stopping
		this.millis = 0;			// millis in total time
		this.seconds = 0;			// seconds in total time
		this.minutes = 0;			// minutes in total time
		this.hours = 0;				// hours in total time
		this.cInterval = 0;			// Interval in which the time is calculated.
	}
	counter.prototype = {
		init : function() {
			this.updateElements();
		},
		start : function() {
			if( this.cInterval === 0 ){ // compared with zero to avoid problems with
				this.startT = new Date(); // continuos start clicks(SetInterval is set multiple times).
				var that = this;
				this.cInterval = window.setInterval(function(){
					that.increment();
				}, 40); // value 50 is an arbitrary value. 
			}			
		},
		stop : function() {
			this.endT = this.currentTime; // Storing the total time elapsed.
			window.clearInterval(this.cInterval);
			this.cInterval = 0;
		},
		reset : function() { // Resetting all attributes
			this.currentTime = 0;
			this.stop();
			this.hours = 
				this.minutes = 
				this.seconds = 
				this.millis = 0;
			this.updateElements();
		},
		/**
		* Adding the leading zeroes to the units.
		*/
		addPadding : function( num, size ){
			var s = num + "";
    		while(s.length < size){
				s = "0" + s;
			}
    		return s;
		},
		increment : function() {
			this.currentTime =  this.endT + (new Date() - this.startT); //endT is the time which is already in the 
			var currentDate = new Date(this.currentTime);		//stopwatch. Rest is the time elapsed after clicking
			this.millis = currentDate.getUTCMilliseconds();		//start button.
			this.seconds = currentDate.getUTCSeconds();
			this.minutes = currentDate.getUTCMinutes();
			this.hours = currentDate.getUTCHours();
			this.updateElements(); // Updating UI
		},
		/**
		* Updating elements in the UI with leading zeroes.
		*/
		updateElements : function() {	
			this.elements[0].value = this.addPadding(this.millis, 3);
			this.elements[1].value = this.addPadding(this.seconds, 2);
			this.elements[2].value = this.addPadding(this.minutes, 2);
			this.elements[3].value = this.addPadding(this.hours, 2);
		}
	}
	/**
	* Attaching events in the start, stop, reset button
	*/
	var attachEvents = function () {
		addEvent(document.getElementById('btn-start'), 'click', startCounter);
		addEvent(document.getElementById('btn-stop'), 'click', stopCounter);
		addEvent(document.getElementById('btn-reset'), 'click', resetCounter);
	}
	var addEvent = function (el, ev, fn) {
	    if (el.addEventListener) {
	        addEvent = function (el, ev, fn) {
	            el.addEventListener(ev, fn, false);
	        };
	    } else if (el.attachEvent) {
	        addEvent = function (el, ev, fn) {
	            el.attachEvent('on' + ev, fn);
	        };
	    } else {
	        addEvent = function (el, ev, fn) {
	            el['on' + ev] =  fn;
	        };
	    }
	    addEvent(el, ev, fn);
	};
	var findElements = function() {
		elements.push(document.getElementById('input-millis'));
		elements.push(document.getElementById('input-seconds'));
		elements.push(document.getElementById('input-minutes'));
		elements.push(document.getElementById('input-hours'));
	}
	var init = function(){
		findElements();
		_counter = new counter(elements); // Creating counter object.
		_counter.init();
		attachEvents(new counter());
	}
	var startCounter = function() {
		_counter.start();
	}
	var stopCounter = function() {
		_counter.stop();
	}
	var resetCounter = function(){
		_counter.reset();
	}
	return {
		init : init
	}
}();
stopWatch.init();
