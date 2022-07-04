import Book from './bookclass.js';

const id = 0;
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const newBook = new Book(title, author, id);

const removee = () => {
  document.querySelector('.form-book').addEventListener('submit', (e) => {
    e.preventDefault();
    newBook.bookTitle = title.value;
    newBook.bookAuthor = author.value;
    newBook.bookId = id;
    if (newBook.bookTitle && newBook.bookAuthor) {
      Book.storeBook(newBook);
      window.location.reload();
    }
  });
};

export default removee;