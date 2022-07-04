import Book from './modules/bookclass.js';
import navigation from './modules/navigation.js';
import addBoook from './modules/add.js';
import removee from './modules/removee.js';
import { DateTime } from './modules/luxon.js';

document.addEventListener('DOMContentLoaded', Book.displayBooks);

const date = document.querySelector('.date');
date.textContent = DateTime.now().toLocaleString(DateTime.DATETIME_MED);

addBoook();
removee();
navigation();
