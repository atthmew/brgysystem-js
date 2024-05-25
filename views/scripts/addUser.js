const addUserOverlay = document.querySelector('.add-user-overlay');
const addUserFormContainer = document.querySelector('.add-container');
const addUserBtn = document.querySelector('.add-user-btn');
const addUserCloseBtn = document.querySelector('.close-add-user');

addUserBtn.addEventListener('click', (e) => {
	e.preventDefault();
	addManyUserFormContainer.classList.add('hidden');
	addManyUserOverlay.classList.add('hidden');

	addUserFormContainer.classList.toggle('hidden');
	addUserOverlay.classList.toggle('hidden');
});
addUserCloseBtn.addEventListener('click', (e) => {
	e.preventDefault();
	addUserFormContainer.classList.toggle('hidden');
	addUserOverlay.classList.toggle('hidden');
});
addUserOverlay.addEventListener('click', (e) => {
	e.preventDefault();
	addUserFormContainer.classList.toggle('hidden');
	addUserOverlay.classList.toggle('hidden');
});
