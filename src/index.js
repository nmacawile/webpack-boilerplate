import 'normalize.css/normalize.css';
import './styles.scss';

const greeting = document.querySelector('.greeting');
const array = [1, 2, 3, 4, 5].map(x => (x ** 2).toString().padStart(2, 0));
greeting.innerHTML = 'Hello';

document.querySelector('.array').innerHTML = array;
