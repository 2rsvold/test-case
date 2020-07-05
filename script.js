let url = 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100';
let perPage = 20;

function addColumn(text) {
	let column = document.createElement('td');
	column.innerText = text;
	return column;
}

function addPage(page) {
	let li = document.createElement('li');
	let a = document.createElement('a');

	// Set classes
	a.classList.add('page-link');
	li.classList.add('page-item');
	
	// Set link attributes
	a.href = "#";
	a.innerText = page + 1;
	a.onclick = () => showPage(page);

	// Append to li node
	li.appendChild(a);

	// Add li
	document.getElementById('pagination').appendChild(li);
}

function showPage(page) {
	let minEntry = page * perPage;
	let maxEntry = minEntry + perPage;

	// Loop trough every entry
	let childs = document.getElementById('table-data').children;

	// Filter children
	for(i = 0; i < childs.length; i++) {
		if (i >= minEntry && i < maxEntry) {
			// Default display option set by Bootstrap
			childs[i].style.display = 'table-row';
		} else {
			childs[i].style.display = 'none';
		}
	};
}

function createNavigation() {
	let childs = document.getElementById('table-data').children;
	let pages = Math.ceil(childs.length / perPage);

	for (i = 0; i < pages; i++)
		addPage(i);
}

async function handleData(data) {
	document.getElementById('table-loading').remove();
	data = await data.json();
	data = data.items;

	// Loop trough entry
	data.forEach(element => {
		let row = document.createElement('tr');

		// Add columns to row
		row.appendChild(this.addColumn(element.full_name));
		row.appendChild(this.addColumn(element.forks));
		row.appendChild(this.addColumn(element.open_issues));
		row.appendChild(this.addColumn(element.stargazers_count));

		document.getElementById('table-data').append(row);
	});

	// Set default page and create navigation
	createNavigation();
	showPage(0);
}

// Load data
fetch(url).then(response => handleData(response));