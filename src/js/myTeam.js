/* eslint-disable no-console */
import { Chart, registerables } from 'chart.js';
import { Player } from './classes/Player';
import { serveDetails, servePlayers } from './functions/playerFunctions';
import { createData } from './constants/chartConstants';
import { getUserNameFromkSesionStorage, checkSesionStorage, logOut } from './functions/registerFunctions';

Chart.register(...registerables);

const header = document.querySelector('header');
const usarname = header.querySelector('#username');
const logout = header.querySelector('button');
const playersList = document.getElementById('playersList');
const playerDetail = document.getElementById('playerDetail');

let list;
let statChart;

document.addEventListener('DOMContentLoaded', () => {
    list = JSON.parse(localStorage.getItem('players'));
    console.log(list);
    servePlayers(list, playersList);

    if (checkSesionStorage()) {
        usarname.text = getUserNameFromkSesionStorage();
        list = JSON.parse(localStorage.getItem('players'));
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
        serveDetails(player, playerDetail);
        const config = {
            type: 'radar',
            data: createData([
                player.getShots(), player.getPasses(),
                player.getKeyPasses(), player.getDuels(),
                player.getDribbles(),
            ]),
            options: {},
        };
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