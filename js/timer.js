function Timer(timestamp) {

	this.timeInterval 	= null;
	this.timeStamp 		= timestamp || 0;
	this.callback 		= null;
	this.date 			= {
		hours 	: 0,
		minutes	: 0,
		seconds	: 0
	};

	this.calculate();
}

Timer.prototype.start = function () {

	this.stop();

	if (!this.timeInterval) {

		this.timeInterval = setInterval(function () { this.count(); }.bind(this), 1000)
	}

	return this;
};

Timer.prototype.stop = function () {

	clearInterval(this.timeInterval);

	this.timeInterval = null;
};

Timer.prototype.count = function () {

	this.timeStamp++;

	this.calculate();

	if (this.callback) {
		
		this.callback(this.date, this);
	}
};

Timer.prototype.calculate = function () {

	var hours	= Math.floor(this.timeStamp / 60 / 60);
	var minutes	= Math.floor(this.timeStamp / 60) - (hours * 60);
	var seconds	= this.timeStamp % 60;

	this.date = {
		hours,
		minutes,
		seconds
	};
};

Timer.prototype.done = function (callback) {

	if (typeof callback !== 'function') {

		this.stop();

		throw 'O argumento de done só permite funcções';
	}

	this.callback = callback;
};