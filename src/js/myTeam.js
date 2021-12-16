/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
import { Chart, registerables } from 'chart.js';
import { Player } from './classes/Player';
import { serveDetails, servePlayers } from './functions/playerFunctions';
import { createData } from './constants/chartConstants';
import { getUserNameFromkSesionStorage, checkSesionStorage, logOut } from './functions/registerFunctions';
import { Team } from './classes/Team';

Chart.register(...registerables);

const body = document.querySelector('body');
const header = body.querySelector('header');
const usarname = header.querySelector('#username');
const logout = header.querySelector('button');
const playersList = body.querySelector('#playersList');
const playerDetail = body.querySelector('#playerDetail');
const teamArea = body.querySelector('#teamArea');

let playerList;
let statChart;
let selectedPlayerId;
let selected;
const team = new Team();
const htmlItem = `
    <div name="$$ITEM_ID$$" class='m-3 team_item'>
        <div style="cursor: pointer;" draggable=true>
            <img style="height: 4em;" src="$$ITEM_PHOTO$$">
            <a>$$ITEM_NAME$$</a>
        </div>
    </div>
    `;
function serveTeam() {
    teamArea.innerHTML = '';
    for (const player of team.players) {
        const replacedItemHTML = htmlItem.replace('$$ITEM_ID$$', player.id).replace('$$ITEM_PHOTO$$', player.photo).replace('$$ITEM_NAME$$', player.name);
        teamArea.insertAdjacentHTML('beforeend', replacedItemHTML);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (checkSesionStorage()) {
        usarname.text = getUserNameFromkSesionStorage();
        playerList = JSON.parse(localStorage.getItem('players'));
        if (localStorage.getItem('team') !== null) {
            team.get();
            serveTeam();
        }
        servePlayers(playerList, playersList);
        const items = document.querySelectorAll('img');
        console.log(items);
        for (const item of items) {
            item.closest('div').draggable = true;
        }
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
        const playerObj = playerList.find((elem) => elem.id == idPlayer);
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

document.addEventListener('dragover', (event) => {
    // prevent default to allow drop
    event.preventDefault();
}, false);

document.addEventListener('dragleave', (event) => {
// reset background of potential drop target when the draggable element leaves it
    if (event.target.className === 'dropzone') {
        event.target.style.background = '';
    }
}, false);

document.addEventListener('dragstart', (e) => {
    selectedPlayerId = e.target.parentElement.getAttribute('name');
    selected = e.target;
    console.log(selected);
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
    const dropArea = e.target.closest('.dropzone');
    if (selected.parentElement.classList.contains('player_item')) {
        // eslint-disable-next-line eqeqeq
        if (dropArea !== null && !team.players.some((item) => item.id == selectedPlayerId)) {
            e.target.style.background = '';
            // eslint-disable-next-line eqeqeq
            const player = new Player(playerList.find((p) => p.id == selectedPlayerId));
            const res = team.addPlayer(player);
            if (res.status) {
                const replacedItemHTML = htmlItem.replace('$$ITEM_ID$$', player.id).replace('$$ITEM_PHOTO$$', player.photo).replace('$$ITEM_NAME$$', player.name);
                teamArea.insertAdjacentHTML('beforeend', replacedItemHTML);
                team.save();
            } else {
                window.alert(res.msg);
            }
        }
    } else if (selected.parentElement.classList.contains('team_item')) {
        body.querySelector('.dropzone').removeChild(selected.parentElement);
        team.removePlayer(selectedPlayerId);
        team.save();
    }
}, false);

// TODO remove