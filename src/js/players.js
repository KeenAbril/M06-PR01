import { getPlayerResponse } from './functions/playerFunctions';

const formPlayer = document.getElementById('formPlayer');

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