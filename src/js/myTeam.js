import { Player } from './classes/Player';
import { getPlayerResponse, servePlayers } from './functions/playerFunctions';
import { getUserNameFromkSesionStorage, checkSesionStorage, logOut } from './functions/registerFunctions'

const header = document.querySelector('header');
const usarname = header.querySelector('a');
const logout = header.querySelector('button');
const playersList = document.getElementById('playersList');

// Test Function adds default
async function saveTestPlayers() {
    const playerList = [];
    const response = await getPlayerResponse(529);
    const players = response.msg.response;
    for (let i = 0; i < players.length; i++) {
        const playerObj = {
            id: players[i].player.id,
            name: players[i].player.name,
            photo: players[i].player.photo,
            // team: id,
        };

        console.log(JSON.stringify(playerObj));

        const player = new Player(playerObj);
        playerList.push(player);
    }
    localStorage.setItem('playerList', JSON.stringify(playerList));
}

document.querySelector('#testLoad').addEventListener('click', async () => {
    await saveTestPlayers();
    alert('Players saved');
});

document.addEventListener('DOMContentLoaded', () => {
    if (checkSesionStorage()) {
        usarname.text = getUserNameFromkSesionStorage();
        const list = JSON.parse(localStorage.getItem('playerList'));
        console.log(list);
        servePlayers(list, playersList);
    } else {
        window.location.href = 'index.html';
    }
});

logout.addEventListener('click', () => {
    logOut();
    window.location.href = 'index.html';
});