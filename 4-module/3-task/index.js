function highlight(table) {
  for (let i = 1; i < table.rows.length; i++) {
	let rows = table.rows[i];

	let available = rows.cells[3].getAttribute('data-available');

	if (available === null) {
		rows.hidden = true;
	} else if (available == 'true') {
		rows.classList.add('available');
	} else {
		rows.classList.add('unavailable')
	}

	let gender = rows.cells[2].textContent;

	if (gender === 'm') {
		rows.classList.add('male');
	} else {
		rows.classList.add('female');
	};
	
	let age = rows.cells[1].textContent;
	
	if (age < 18) {
			rows.style = "text-decoration: line-through";
	}

  }
}
