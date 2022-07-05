/* eslint-disable no-restricted-globals */
/*  eslint linebreak-style: ["error", "unix"]   */
/* eslint-disable no-undef */
import navigation from './modules/navigation.js';
import { DateTime } from './modules/luxon.js';

const title = document.getElementById('title');
const author = document.getElementById('author');
const addButton = document.getElementById('add-btn');
const bookDiv = document.getElementById('book-div');
let id = 0;

class Book {
  constructor(bookTitle, bookAuthor, bookId) {
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.bookId = bookId;
  }

  static addBook(newBook) {
    const book = document.createElement('div');
    book.classList.add('book-dynamic');
    newBook.bookId = id;
    book.innerHTML = `
      <p>"${newBook.bookTitle}" by ${newBook.bookAuthor}</p>
      <button class="remove-button remove-btn" id="${id}">Remove</button>
    `;
    bookDiv.appendChild(book);
    id += 1;
  }

  static displayBooks() {
    const books = Book.getBooks();
    books.forEach((newBook) => Book.addBook(newBook));
  }

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static storeBook(newBook) {
    const books = Book.getBooks();
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(bookId) {
    const books = Book.getBooks();
    bookId = parseInt(bookId, 10);
    let bookArray = [];
    books.forEach((book, index) => {
      if (book.bookId === bookId) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
    bookArray = this.getBooks();
    if (bookArray.length === 1) {
      if (bookArray[0].bookId > 0) {
        bookArray[0].bookId = 0;
      }
    } else {
      for (let i = bookId; i < bookArray.length; i += 1) {
        bookArray[bookId].bookId = i;
        bookId += 1;
      }
    }
    localStorage.setItem('books', JSON.stringify(bookArray));
  }

  static deleteBook(el) {
    if (el.classList.contains('remove-btn')) {
      el.parentElement.remove();
    }
    location.reload();
  }
}

const newBook = new Book(title, author, id);

document.querySelector('#book-div').addEventListener('click', (e) => {
  Book.deleteBook(e.target);
  Book.removeBook(e.target.id);
});

addButton.onclick = () => {
  newBook.bookTitle = title.value;
  newBook.bookAuthor = author.value;
  newBook.bookId = id;
  if (newBook.bookTitle && newBook.bookAuthor) {
    Book.storeBook(newBook);
    location.reload();
  }
};

document.addEventListener('DOMContentLoaded', Book.displayBooks);

const date = document.querySelector('.time-date');
date.textContent = DateTime.now().toLocaleString(DateTime.DATETIME_MED);

navigation();
