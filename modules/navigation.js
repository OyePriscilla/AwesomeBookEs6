const list = document.getElementById('list');
const add = document.getElementById('add');
const contact = document.getElementById('contact');
const allBooks = document.querySelector('.all-books');
const addingBook = document.querySelector('.adding-book');
const contactUs = document.querySelector('.contact-us');

const navigation = () => {
  list.addEventListener('click', () => {
    list.firstChild.classList.add('active');
    contact.firstChild.classList.remove('active');
    add.firstChild.classList.remove('active');
    addingBook.style.display = 'none';
    contactUs.style.display = 'none';
    allBooks.style.display = 'block';
  });
  add.addEventListener('click', () => {
    allBooks.style.display = 'none';
    contactUs.style.display = 'none';
    addingBook.style.display = 'block';
    add.firstChild.classList.add('active');
    list.firstChild.classList.remove('active');
    contact.firstChild.classList.remove('active');
  });
  contact.addEventListener('click', () => {
    allBooks.style.display = 'none';
    addingBook.style.display = 'none';
    contactUs.style.display = 'block';
    contact.firstChild.classList.add('active');
    list.firstChild.classList.remove('active');
    add.firstChild.classList.remove('active');
  });
};

export default navigation;