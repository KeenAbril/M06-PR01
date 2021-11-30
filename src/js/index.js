import { User } from './classes/User';
import { getRegisterResponse } from './functions/registerFunctions';

const form = document.getElementById('formRegister');

console.log(form);
form.addEventListener('submit', async (e) => {
    console.log("0");
    e.preventDefault();
    console.log("1");
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
            //console.log(status.status);
            // TODO rediect a la pagina de equipos
            //window.location.href = 'teams.html';
        } else {
            console.log(usrObj);
            window.alert('nop');
            // TODO alerta bien
        }
    }
});
