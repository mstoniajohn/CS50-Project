// CLASSES WILL USE STATIC METHODS SO THEY CAN BE CALLED DIRECTLY

//===================BOOK: Represents a Book==================//
class Book {
	constructor(author, title, isbn) {
		this.author = author;
		this.title = title;
		this.isbn = isbn;
	}
}

//===================UI CLASS: Handles UI Task==================//
class UI {
	static displayBooks() {
		const books = Store.getBooks();
		if (books.length === 0)
			UI.showAlert(
				'You do not have any books stored. Please add some :)',
				'warning',
				4000
			);
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
       <!-- <td><a href="" class="btn btn-sm btn-light edit">edit</a></td>-->
        `;
		// appened row to list of boos=ks
		list.appendChild(row);
	}
	// Delete book
	static deleteBook(el) {
		if (el.classList.contains('delete')) {
			// Remove tr from DOM
			el.parentElement.parentElement.remove();
		}
	}
	// Edit book

	// static editBook(el) {
	// 	if (el.classList.contains('edit')) {
	// 		let books = Store.getBooks();
	// 		// Remove tr from DOM
	// 		if (el.parentElement.parentElement)
	// 			document.querySelector('#title').value = book.title;
	// 		console.log(book);
	// 	}
	// }

	static showAlert(message, className, time = 3000) {
		const div = document.createElement('div');

		// add classes
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));

		const container = document.querySelector('.container');
		const form = document.querySelector('#book-form');
		// add before the above the form
		container.insertBefore(div, form);

		// Remove Alert aftfer 3 seconds
		setTimeout(() => document.querySelector('.alert').remove(), time);
	}

	static clearFields() {
		document.querySelector('#title').value = '';
		document.querySelector('#author').value = '';
		document.querySelector('#isbn').value = '';
	}
}

//===================STORE CLASS: Handles Storage in Local Storage==================//
class Store {
	static getBooks() {
		let books;
		// Check if any books are available
		if (localStorage.getItem('books') === null) {
			books = [];
		} else {
			// Local storage only stores strings to parse the data with JSON.parse to an object
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;
	}

	// Add books
	static addBook(book) {
		const books = Store.getBooks();
		books.push(book);
		// Make Book Object a string
		localStorage.setItem('books', JSON.stringify(books));
	}
	// Remove book
	static removeBook(isbn) {
		const books = Store.getBooks();
		books.forEach((book, index) => {
			if (book.isbn === isbn) {
				// splice // remove book from array
				books.splice(index, 1);
			}
		});
		// Reset Local storage with book removed
		// Books are made strings since local storage stores strings
		localStorage.setItem('books', JSON.stringify(books));
	}
}

//===================EVENT Display Book=================//
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//===================EVENT Add a Book=================//
document.querySelector('#book-form').addEventListener('submit', (e) => {
	// Prevent the default behaviour of browser
	e.preventDefault();
	// get form values
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const isbn = document.querySelector('#isbn').value;

	// Validate
	if (title === '' || isbn === '' || author === '') {
		UI.showAlert('Please fill out all fields.', 'danger');
		//
	} else {
		// instantiate book
		const book = new Book(title, author, isbn);

		// Add Book to UI
		UI.addBookToList(book);

		// Add book to Local Storage/Store
		Store.addBook(book);

		//Show succes message
		UI.showAlert('Book added to successfully', 'success');

		// Clear Fields
		UI.clearFields();
	}
});

//==================EVENT Remove Book =================//
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

// Event eidt book
// //==================EVENT Update Book =================//
// document.querySelector('#book-list').addEventListener('click', (e) => {
// 	// Prevent the default behaviour of browser
// 	e.preventDefault();

// 	// Remove book from UI
// 	UI.editBook(e.target);

// 	//Show succes message
// 	UI.showAlert('Book updated', 'success');
// });

// Store.updateBook(book);
