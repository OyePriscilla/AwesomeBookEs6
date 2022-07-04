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
          <h4 class = "title-author">"${newBook.bookTitle}" by ${newBook.bookAuthor}</h4>
            <button class="remove-button remove-btn" id="${id}">Remove</button><br>

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
    books.unshift(newBook);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(bookId) {
    const books = Book.getBooks();
    const number = parseInt(bookId, 10);
    let bookArray = [];
    books.forEach((book, index) => {
      if (book.bookId === number) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
    bookArray = this.getBooks();
    if (bookArray.length === 1) {
      if (bookArray[0].bookId === 1) {
        bookArray[0].bookId = 0;
      }
    } else {
      for (let i = bookId; i < bookArray.length; i += 1) {
        bookArray[bookId].bookId = number;
      }
    }
    localStorage.setItem('books', JSON.stringify(bookArray));
  }
}

export default Book;