// CLASSES WILL USE STATIC METHODS SO THEY CAN BE CALLED DIRECTLY

// Book class: Represents a Book
class Book {
	constructor(author, title, isbn) {
		this.author = author;
		this.title = title;
		this.isbn = isbn;
	}
}

// UI Class: Handles UI Task
class UI {
	static displayBooks() {
		const books = Store.getBooks();
		books.forEach((book) => UI.addBookToList(book));
	}

	static addBookToList(book) {
		// create row for tbody
		const list = document.querySelector('#book-list');
		// create tr row for
		const row = document.createElement('tr');

		row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="" class="btn btn-sm btn-danger delete">X</a></td>

        `;
		// appened row to list of boos=ks
		list.appendChild(row);
	}
	static deleteBook(el) {
		if (el.classList.contains('delete')) {
			// Remove tr from DOM
			el.parentElement.parentElement.remove();
		}
	}

	static showAlert(message, className) {
		const div = document.createElement('div');

		// add classes
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));

		const container = document.querySelector('.container');
		const form = document.querySelector('#book-form');
		// add before the above the form
		container.insertBefore(div, form);

		// Remove Alert in 3 seconds
		setTimeout(() => document.querySelector('.alert').remove(), 3000);
	}

	static clearFields() {
		document.querySelector('#title').value = '';
		document.querySelector('#author').value = '';
		document.querySelector('#isbn').value = '';
	}
}

// Store Class: Handles Storage in Local Storage
class Store {
	static getBooks() {
		let books;
		if (localStorage.getItem('books') === null) {
			books = [];
		} else {
			// Local storage only stores strings to parse the data with JSON.parse to an object
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;
	}
	static addBook(book) {
		const books = Store.getBooks();
		books.push(book);
		// Make Book Object a string
		localStorage.setItem('books', JSON.stringify(books));
	}
	static removeBook(isbn) {
		const books = Store.getBooks();

		books.forEach((book, index) => {
			if (book.isbn === isbn) {
				// splice // remove book from array
				books.splice(index, 1);
			}
		});
		// Reset Local storage with book removed
		localStorage.setItem('books', JSON.stringify(books));
	}
}

// Event Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
	// Prevent the default behaviour of browser
	e.preventDefault();

	// get form values
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const isbn = document.querySelector('#isbn').value;

	// Validate
	if (title === '' || isbn === '' || author === '') {
		UI.showAlert('Please fill out all fields', 'danger');
		//
	} else {
		// instantiate book
		const book = new Book(title, author, isbn);

		// Add Book to UI
		UI.addBookToList(book);

		// Add book to Local Storage/ Store
		Store.addBook(book);

		//Show succes message
		UI.showAlert('Book added to list', 'success');

		// Clear Fields
		UI.clearFields();
	}
});

// Event Remove Book
document.querySelector('#book-list').addEventListener('click', (e) => {
	// Prevent the default behaviour of browser
	e.preventDefault();

	// Remove book from UI
	UI.deleteBook(e.target);

	// Remove Book from Store
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

	//Show succes message
	UI.showAlert('Book removed', 'success');
});
