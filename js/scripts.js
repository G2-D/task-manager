(function () {

	var formRegisterTask		= document.getElementById('form_register_task');
	var buttonCalculateTotal 	= document.getElementById('btn_calculate_total');
	var timerInstance 			= [];
	var templateTask 			= null;

	var setTemplateTask = (template) => {

		templateTask = template;
	};

	var getTemplateTask = () => {

		return templateTask;
	};

	var verifyTemplate = () => {

		var template = document.getElementById('task_template');

		if (!template) {

			return false;
		}

		setTemplateTask(template.content);

		return true;
	};

	var timeToString = function (date) {

		var hours	= date.hours.toString().padStart(2, '0');
		var minutes = date.minutes.toString().padStart(2, '0');
		var seconds = date.seconds.toString().padStart(2, '0');

		return hours + ':' + minutes + ':' + seconds;
	};

	var playTask = (e) => {

		e.preventDefault();

		var target 		= e.target;
		var index		= target.getAttribute('data-index');

		var parentNode 	= target.parentNode;
		var textField 	= parentNode.querySelector('.time-field');

		var timer 		= timerInstance[index];

		timer.start().done(function (date, instance) {

			textField.innerText = timeToString(date);

			updateStorageData(index, instance.timeStamp, true);
		});

		//
		target.style.display = 'none';

		parentNode.querySelector('.control-stop').style.display = 'block';
	};

	var stopTask = (e) => {

		e.preventDefault();

		var target	= e.target;
		var index	= target.getAttribute('data-index');

		var parentNode 	= target.parentNode;

		timerInstance[index].stop();
		
		updateStorageData(index, timerInstance[index].timeStamp, false);

		//
		target.style.display = 'none';

		parentNode.querySelector('.control-start').style.display = 'block';
	};

	var renderTaskList = (list) => {

		var taskList 	= document.getElementById('task_list');
		var taskItems 	= taskList.querySelectorAll('.task-item')

		if (Array.isArray(list)) {

			var templateTask = getTemplateTask();
	
			list.forEach((item, index) => {
				
				if (item.hasOwnProperty('label') && item.hasOwnProperty('timestamp')) {

					if (!taskItems[index]) {

						var taskContent = templateTask.cloneNode(true);
	
						var btnStart 	= taskContent.querySelector('.control-start');
						var btnStop 	= taskContent.querySelector('.control-stop');
	
						var timer		= new Timer(item.timestamp);
	
						timerInstance[index] = timer;
			
						taskContent.querySelector('.tesk-field').innerText = item.label;
						taskContent.querySelector('.time-field').innerText = timeToString(timer.date);
	
						btnStart.setAttribute('data-index', index);
						btnStart.addEventListener('click', playTask);

						if (item.started) {

							btnStart.click();
						}
	
						btnStop.setAttribute('data-index', index);
						btnStop.addEventListener('click', stopTask);
						
						taskList.appendChild(taskContent);
					}
				}
			});
		}
	};

	var getStorageData = function () {

		var storageData = localStorage.getItem('task-list');
			storageData = JSON.parse(storageData) || [];

		return storageData;
	};

	var setStorageData = function (data) {

		localStorage.setItem('task-list', JSON.stringify(data));
	};

	var updateStorageData = function (index, timestamp, started) {

		var storageData = getStorageData();

		storageData[index].timestamp = timestamp;
		storageData[index].started = started;

		setStorageData(storageData);
	};

	var submitForm = function (e) {

		e.preventDefault();

		var input = e.target.elements.input_task;

		if (!input.value.length) {

			return false;
		}

		var data = {
			label 		: input.value,
			timestamp 	: 0,
			started 	: false
		};

		var storageData = getStorageData();
			storageData.push(data);

		setStorageData(storageData);

		renderTaskList(storageData);

		input.value = '';
	};

	var getTotalTime = function () {

		var storageData = getStorageData();
		var timestamp	= 0;
		var totalField 	= document.querySelector('.total-time');

		storageData.forEach(function (item) {

			timestamp += item.timestamp;
		});

		var timer = new Timer(timestamp);

		totalField.innerText = timeToString(timer.date);
	}

	var calculateTotal = function (e) {

		e.preventDefault();

		getTotalTime();
	};

	var init = function () {

		formRegisterTask.addEventListener('submit', submitForm);
		buttonCalculateTotal.addEventListener('click', calculateTotal);

		if (verifyTemplate()) {

			renderTaskList(getStorageData());
			getTotalTime();
		}
	};

	init();
}())