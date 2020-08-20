(function () {

	let templateTask;

	const getTemplateTask = () => {

		const template = document.getElementById('task_template')

		if (!template) {

			return false;
		}
		
		templateTask = template.content;

		return true;
	}

	const playTask = (e) => {

		e.preventDefault();

		console.log('play');
	};

	const stopTask = (e) => {

		e.preventDefault();
	};

	const init = () => {

		if (getTemplateTask()) {

			const arr = [
				{
					name : 'Task 1',
					time : '123'
				},
				{
					name : 'Task 2',
					time : '456'
				},
				{
					name : 'Task 3',
					time : '789'
				}
			];

			const taskForm = document.getElementById('form_task_list');

			taskForm.innerHTML = '';

			arr.forEach((item) => {

				const taskContent = templateTask.cloneNode(true);

				taskContent.querySelector('.task-field').value = item.name;
				taskContent.querySelector('.time-field').value = item.time;

				taskContent.querySelector('.play-task').addEventListener('click', playTask);
				taskContent.querySelector('.stop-task').addEventListener('click', stopTask);
				
				taskForm.appendChild(taskContent);
			});
		}
	};

	init();
}())