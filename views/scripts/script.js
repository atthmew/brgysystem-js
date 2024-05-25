const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach((item) => {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach((i) => {
			i.parentElement.classList.remove('active');
		});
		li.classList.add('active');
	});
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
});

const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if (window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if (searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
});

const mainSearchButton = document.querySelector('#content main form .form-input button');
const mainSearchButtonIcon = document.querySelector('#content main form .form-input button .bx');
const mainSearchForm = document.querySelector('#content main form');

mainSearchButton.addEventListener('click', function (e) {
	if (window.innerWidth < 576) {
		e.preventDefault();
		mainSearchForm.classList.toggle('show');
		if (mainSearchForm.classList.contains('show')) {
			mainSearchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			mainSearchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
});

if (window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
	if (this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
});

const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if (this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
});

// $(document).ready(function () {
// 	$('table').DataTable({
// 		order: [1, 'asc'],
// 		searching: true,
// 		sorting: true,
// 		paging: true,
// 		pageLength: 10, // Show 10 rows per page

// 		language: {
// 			searchPlaceholder: '',
// 			paginate: {
// 				first: '<<',
// 				last: '>>',
// 				previous: '<',
// 				next: '>',
// 			},
// 		},
// 	});
// });

// Get the DataTable instance
var table = $('table').DataTable({
	language: {
		searchPlaceholder: '',
		paginate: {
			first: '<<',
			last: '>>',
			previous: '<',
			next: '>',
		},
	},
});

// Add event listener to the search input field
$('#search').on('keyup', function () {
	// Perform search on the DataTable
	table.search(this.value).draw();
});
