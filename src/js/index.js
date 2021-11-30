import { User } from './classes/User';
import { getRegisterResponse } from './functions/registerFunctions';

<<<<<<< HEAD
const form = document.getElementById('formRegister');

console.log(form);
form.addEventListener('submit', async (e) => {
=======
console.log('hola');

// const form = document.getElementById('formRegister');
const formPlayer = document.getElementById('formPlayer');

// console.log(form);
/* form.addEventListener('submit', async (e) => {
>>>>>>> 3aa756cb974cc03dbeb3545f22f2a4661113cea3
    e.preventDefault();
    const usrObj = {
        email: form.email.value,
        username: form.username.value,
        realName: form.realName.value,
        password: form.password.value,
    };
    if (User.checkUser(usrObj)) {
        const u = new User(usrObj);
        const response = await getRegisterResponse(u);
        if (response.status !== 404) {
            u.saveUser();
            console.log(response.msg);
            // window.alert('si');
            // TODO rediect a la pagina de equipos
            window.location.href = 'players.html';
        } else {
            // console.log(usrObj);
            // window.alert('nop');
            // TODO alerta bien
        }
    }
});
