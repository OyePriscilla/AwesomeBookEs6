/* eslint-disable no-restricted-globals */
/*  eslint linebreak-style: ["error", "unix"]   */
/* eslint-disable no-undef */
import navigation from './modules/navigation.js';
import { DateTime } from './modules/luxon.js';

const title = document.getElementById('title');
const author = document.getElementById('author');
const addButton = document.getElementById('add-btn');
const booksList = document.getElementById('books-list');
let id = 0;

class Book {
  constructor(bookTitle, bookAuthor, bookId) {
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.bookId = bookId;
  }

  static addBook(newBook) {
    const book = document.createElement('div');
    book.classList.add('single-book');
    newBook.bookId = id;
    book.innerHTML = `
      <p>"${newBook.bookTitle}" by ${newBook.bookAuthor}</p>
      <button class="rmv-btn delete" id="${id}">Remove</button>
    `;
    booksList.appendChild(book);
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
    let newArrayBooks = [];
    books.forEach((book, index) => {
      if (book.bookId === bookId) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
    newArrayBooks = this.getBooks();
    if (newArrayBooks.length === 1) {
      if (newArrayBooks[0].bookId > 0) {
        newArrayBooks[0].bookId = 0;
      }
    } else {
      for (let i = bookId; i < newArrayBooks.length; i += 1) {
        newArrayBooks[bookId].bookId = i;
        bookId += 1;
      }
    }
    localStorage.setItem('books', JSON.stringify(newArrayBooks));
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.remove();
    }
    location.reload();
  }
}

const newBook = new Book(title, author, id);

// Event: Remove a Book
document.querySelector('#books-list').addEventListener('click', (e) => {
  // Remove book from UI
  Book.deleteBook(e.target);

  // Remove book from store
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
