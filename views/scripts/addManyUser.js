const addManyUserOverlay = document.querySelector('.add-many-user-overlay');
const addManyUserFormContainer = document.querySelector('.add-many');
const addManyUserCloseBtn = document.querySelector('.close-add-many-user');
const addManyUserBtn = document.querySelector('.add-many-user-btn');
const goBackBtn = document.querySelector('.no-add-many');

addManyUserBtn.addEventListener('click', (e) => {
	e.preventDefault();
	addManyUserFormContainer.classList.toggle('hidden');
	addManyUserOverlay.classList.toggle('hidden');

	addUserFormContainer.classList.add('hidden');
	addUserOverlay.classList.add('hidden');
});

addManyUserCloseBtn.addEventListener('click', (e) => {
	e.preventDefault();
	addManyUserFormContainer.classList.toggle('hidden');
	addManyUserOverlay.classList.toggle('hidden');
});

addManyUserOverlay.addEventListener('click', (e) => {
	e.preventDefault();
	addManyUserFormContainer.classList.toggle('hidden');
	addManyUserOverlay.classList.toggle('hidden');
});

goBackBtn.addEventListener('click', (e) => {
	e.preventDefault();
	addManyUserFormContainer.classList.toggle('hidden');
	addManyUserOverlay.classList.toggle('hidden');
});
