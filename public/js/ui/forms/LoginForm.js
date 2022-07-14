/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
	/**
	 * Производит авторизацию с помощью User.login
	 * После успешной авторизации, сбрасывает форму,
	 * устанавливает состояние App.setState( 'user-logged' ) и
	 * закрывает окно, в котором находится форма
	 * */
	onSubmit(data) {
		User.login(data, (err, response) => {
			if (err) {
				console.error(err);
			} else if (response.success) {
				App.setState('user-logged');
				App.modals.login.onClose();
			} else if (!response.success) {
				console.error(response);
				alert(`${response.error}`);
			};
		});
	}
}