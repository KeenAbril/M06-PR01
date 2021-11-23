import { User } from './classes/User';

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const usrObj = {
        email: form.email.value,
        username: form.username.value,
        realName: form.realName.value,
        password: form.password.value,
    };
    if (User.checkUser(usrObj)) {
        window.alert('works');
    } else {
        console.log(usrObj);
        window.alert('nop');
    }
});