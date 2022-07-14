/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
	/**
	 * Вызывает родительский конструктор и
	 * метод renderAccountsList
	 * */
	constructor(element) {
		super(element)
		this.renderAccountsList();
	}

	/**
	 * Получает список счетов с помощью Account.list
	 * Обновляет в форме всплывающего окна выпадающий список
	 * */
	renderAccountsList() {
		Account.list(
			User.current(),
			(err, response) => {
				if (err) {
					console.log(err);
				} else if (response.success && response.data.length !== 0) {
					this.element.querySelector(".accounts-select").innerHTML = "";
					response.data.forEach((account) => {
						this.element.querySelector(".accounts-select").innerHTML += `<option value=\"${account.id}\">${account.name}</option>`;
					});
				};
			});
	}

	/**
	 * Создаёт новую транзакцию (доход или расход)
	 * с помощью Transaction.create. По успешному результату
	 * вызывает App.update(), сбрасывает форму и закрывает окно,
	 * в котором находится форма
	 * */
	onSubmit(data) {
		console.log(data)
		Transaction.create(
			data,
			(err, response) => {
				if (err) {
					console.log(err);
				} else if (response.success) {
					App.pages.transactions.lastOptions.account_id = data.account_id;
					App.update();
					this.element.closest(".modal").style.display = "none";
				};
			});
	}
}