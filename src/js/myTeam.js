import { Chart, registerables } from 'chart.js';
import { Player } from './classes/Player';
import { getPlayerResponse, servePlayers } from './functions/playerFunctions';
import { createData } from './constants/chartConstants';
import { getUserNameFromkSesionStorage, checkSesionStorage, logOut } from './functions/registerFunctions';

Chart.register(...registerables);

const header = document.querySelector('header');
const usarname = header.querySelector('a');
const logout = header.querySelector('button');
const playersList = document.getElementById('playersList');

// Test Function adds default
/*
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
try {
    document.querySelector('#testLoad').addEventListener('click', async () => {
        await saveTestPlayers();
        alert('Players saved');
    });
} catch {}
*/
let list;
let statChart;

document.addEventListener('DOMContentLoaded', () => {
    list = JSON.parse(localStorage.getItem('players'));
    console.log(list);
    servePlayers(list, playersList);

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

playersList.addEventListener('click', (e) => {
    const item = e.target.closest('.player_item');
    if (item) {
        const idPlayer = item.getAttribute('name');
        // eslint-disable-next-line eqeqeq
        const playerObj = list.find((elem) => elem.id == idPlayer);
        const player = new Player(playerObj);
        console.log(player);
        // shots, passes, key passes, duels, dribbles
        const config = {
            type: 'radar',
            data: createData([
                player.getShots(), player.getPasses(),
                player.getKeyPasses(), player.getDuels(),
                player.getDribbles(),
            ]),
            options: {},
        };
        console.log(config.data);
        // eslint-disable-next-line no-unused-vars
        if (statChart instanceof Chart) {
            statChart.destroy();
        }
        statChart = new Chart(
            document.getElementById('myChart'),
            config,
        );
    }
});