//

const form = document.getElementById('form');
const list = document.querySelector('#todos');
const msg = document.querySelector('.msg');
const inputValue = document.getElementById('todo');
let li = document.createElement('li');

// // Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName('LI');
var i;
for (i = 0; i < myNodelist.length; i++) {
	var span = document.createElement('SPAN');
	var txt = document.createTextNode('\u00D7');
	span.className = 'close';
	span.appendChild(txt);
	myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName('close');
var i;
for (i = 0; i < close.length; i++) {
	close[i].onclick = function () {
		var div = this.parentElement;
		div.style.display = 'none';
	};
}
// Add a "checked" symbol when clicking on a list item
const ul = document.querySelector('ul');
ul.addEventListener(
	'click',
	function (e) {
		if (e.target.tagName === 'LI') {
			e.target.classList.toggle('checked');
		}
	},
	false
);
let todos = localStorage.getItem('todos') || [];
if (todos.length !== 0) {
	todos = todos.split(',');
}

document.addEventListener('DOMContentLoaded', function () {
	if (todos.length !== 0) {
		todos.forEach((todo) => {
			let li = document.createElement('li');
			var span = document.createElement('SPAN');
			var txt = document.createTextNode('\u00D7');
			span.className = 'close';
			span.appendChild(txt);
			li.appendChild(span);
			// Add delete button
			for (i = 0; i < close.length; i++) {
				close[i].onclick = function (e) {
					var div = this.parentElement;
					div.style.display = 'none';

					e.target.parentElement.remove();
					const removeItem = e.target.parentElement.textContent;
					const removed = removeItem.slice(1);
					r = todos.filter((todo) => todo !== removed);
					todos = r;
					localStorage.setItem('todos', r);
				};
			}
			// list todos
			li.appendChild(document.createTextNode(todo));
			list.appendChild(li);

			// Add a "checked" symbol when clicking on a list item
			const ul = document.querySelector('ul');
			ul.addEventListener(
				'click',
				function (e) {
					if (e.target.tagName === 'LI') {
						e.target.classList.toggle('checked');
					}
				},
				false
			);
		});
		// li.innerHTML = ``;
	} else {
		msg.classList.add('error');
		msg.classList.add('my-1');
		msg.innerHTML = 'You do not have any Todos. Please add some :).';
		setTimeout(() => msg.remove(), 5000);
	}
});

function newElement() {
	if (inputValue.value === '') {
		msg.classList.add('error');
		msg.classList.add('p-1');
		msg.innerHTML = 'Please enter a value';
		setTimeout(() => msg.remove(), 3000);
	} else {
		const li = document.createElement('li');
		todos.unshift(inputValue.value.trim());
		localStorage.setItem('todos', todos);

		let t = document.createTextNode(`${inputValue.value}`);
		li.appendChild(t);

		list.insertAdjacentElement('afterbegin', li);
		msg.classList.add('success');
		msg.classList.add('p-1');
		msg.innerHTML = 'Todo added successfully';
		setTimeout(() => msg.remove(), 2000);

		document.getElementById('todo').value = '';
		var span = document.createElement('SPAN');
		var txt = document.createTextNode('\u00D7');
		span.className = 'close';
		span.appendChild(txt);
		li.appendChild(span);

		// Click on a close button to hide the current list item
		var close = document.getElementsByClassName('close');
		var i;
		for (i = 0; i < close.length; i++) {
			close[i].onclick = function (e) {
				var div = this.parentElement;
				e.target.parentElement.remove();
				const removeItem = e.target.parentElement.textContent;
				const removed = removeItem.slice(1);
				r = todos.filter((todo) => todo !== removed);
				todos = r;
				localStorage.setItem('todos', r);
				// div.style.display = 'none';
				e.target.parentElement.remove();
			};
		}

		// Add a "checked" symbol when clicking on a list item
		const ul = document.querySelector('ul');
		ul.addEventListener(
			'click',
			function (e) {
				if (e.target.tagName === 'LI') {
					e.target.classList.toggle('checked');
				}
			},
			false
		);
	}
}
// FORM
form.addEventListener('submit', (e) => {
	e.preventDefault();
	newElement();
	// use database for nodejs send request using fetch to backend. or local storage.
});
