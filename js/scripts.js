(function () {

	let templateTask;

	const setTemplateTask = (template) => {

		templateTask = template;
	};

	const getTemplateTask = () => {

		return templateTask;
	};

	const verifyTemplate = () => {

		const template = document.getElementById('task_template')

		if (!template) {

			return false;
		}

		setTemplateTask(template.content);

		return true;
	}

	const playTask = (e) => {

		e.preventDefault();

		console.log('play');
	};

	const stopTask = (e) => {

		e.preventDefault();

		console.log('stop');
	};

	const renderTaskList = (list) => {

		if (Array.isArray(list)) {

			const templateTask = getTemplateTask();
	
			const taskList = document.getElementById('task_list');
	
			list.forEach((item) => {
				
				if (item.hasOwnProperty('label') && item.hasOwnProperty('time')) {

					const taskContent = templateTask.cloneNode(true);
		
					taskContent.querySelector('.tesk-field').innerText = item.label;
					taskContent.querySelector('.time-field').innerText = item.time;
		
					// taskContent.querySelector('.play-task').addEventListener('click', playTask);
					// taskContent.querySelector('.stop-task').addEventListener('click', stopTask);
					
					taskList.appendChild(taskContent);
				}
			});
		}
	}

	const init = () => {

		if (verifyTemplate()) {

			renderTaskList([
				{
					label	: 'Task 1',
					time	: '01:22:59'
				},
				{
					label	: 'Task 2',
					time 	: '02:33:59'
				},
				{
					label	: 'Task 3',
					time	: '03:44:59'
				}
			]);
		}
	};

	init();
}())