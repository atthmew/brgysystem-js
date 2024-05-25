const realFileBtn = document.getElementById('real-file');
const customBtn = document.getElementById('custom-button');
const customTxt = document.getElementById('custom-text');

customBtn.addEventListener('click', function () {
	realFileBtn.click();
});

realFileBtn.addEventListener('change', function () {
	if (realFileBtn.value) {
		customTxt.innerHTML = realFileBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
	} else {
		customTxt.innerHTML = 'No file chosen, yet.';
	}
});

const importCsvUserOverlay = document.querySelector('.import-csv-overlay');
const importCsvUserFormContainer = document.querySelector('.import-csv');
const importCsvUserCloseBtn = document.querySelector('.close-import-csv');
const importCsvUserBtn = document.querySelector('.import-csv-button-pop');
const importCsvGoBackBtn = document.querySelector('.no-csv');

importCsvUserBtn.addEventListener('click', (e) => {
	e.preventDefault();
	importCsvUserFormContainer.classList.toggle('hidden');
	importCsvUserOverlay.classList.toggle('hidden');

	addUserFormContainer.classList.add('hidden');
	addUserOverlay.classList.add('hidden');
});

importCsvUserCloseBtn.addEventListener('click', (e) => {
	e.preventDefault();
	importCsvUserFormContainer.classList.toggle('hidden');
	importCsvUserOverlay.classList.toggle('hidden');
});

importCsvUserOverlay.addEventListener('click', (e) => {
	e.preventDefault();
	importCsvUserFormContainer.classList.toggle('hidden');
	importCsvUserOverlay.classList.toggle('hidden');
});

importCsvGoBackBtn.addEventListener('click', (e) => {
	e.preventDefault();
	importCsvUserFormContainer.classList.toggle('hidden');
	importCsvUserOverlay.classList.toggle('hidden');
});
