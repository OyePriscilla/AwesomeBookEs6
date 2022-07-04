const list = document.getElementById('list-display');
const addBookInList = document.getElementById('add-new-display');
const contact = document.getElementById('contact-display');

const navigation = () => {
  list.addEventListener('click', () => {
    list.classList.add('active');
    addBookInList.classList.remove('active');
    contact.classList.remove('active');
    document.getElementById('add-book').style.display = 'none';
    document.getElementById('list').style.display = 'block';
    document.getElementById('contact').style.display = 'none';
  });
  addBookInList.addEventListener('click', () => {
    list.classList.remove('active');
    addBookInList.classList.add('active');
    contact.classList.remove('active');
    document.getElementById('list').style.display = 'none';
    document.getElementById('add-book').style.display = 'block';
    document.getElementById('contact').style.display = 'none';
  });
  contact.addEventListener('click', () => {
    list.classList.remove('active');
    addBookInList.classList.remove('active');
    contact.classList.add('active');
    document.getElementById('list').style.display = 'none';
    document.getElementById('add-book').style.display = 'none';
    document.getElementById('contact').style.display = 'block';
  });
};

export default navigation;