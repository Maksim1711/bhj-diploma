/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
	const xhr = new XMLHttpRequest();
	xhr.responseType = 'json';
	if (options.method === 'GET') {
		options.url = `${options.url}${getUrlRqstGET(options.data)}`;
	};
	const formData = new FormData;
	for (let key in options.data) {
		formData.append(`${key}`, `${options.data[key]}`);
	};
	xhr.open(options.method, options.url);
	options.method === 'GET' ? xhr.send() : xhr.send(formData);
	xhr.onload = () => options.callback(null, xhr.response);
	xhr.onerror = () => options.callback(xhr.response.error);
};
