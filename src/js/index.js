import { User } from './classes/User';

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const usrObj = {
        email: form.email,
        username: form.username,
        realName: form.realName,
        password: form.password,
    };
    if (User.checkUser(usrObj)) {
        window.alert('works');
    }
});