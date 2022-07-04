import Book from './bookclass.js';

const addBoook = () => {
  document.querySelector('#book-div').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      e.target.parentElement.remove();
    }
    Book.removeBook(e.target.id);
  });
};

export default addBoook;