import { User } from './classes/User';
import { Player } from './classes/Player';
import { getRegisterResponse } from './functions/registerFunctions';
import { getPlayerResponse } from './functions/playerFunctions';

console.log('hola');

// const form = document.getElementById('formRegister');
const formPlayer = document.getElementById('formPlayer');

// console.log(form);
/* form.addEventListener('submit', async (e) => {
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
 */
formPlayer.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('1');
    /* const playerObj = {
        season: '2020',
        team: '529',
    };
    const p = new User(playerObj); */
    const response = await getPlayerResponse();
    if (response.status !== 404) {
        console.log(response.msg);
    } else {
        console.log(response.status);
    }
});