/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { getTeams, serveTeams } from './functions/teamsFunctions';
import {
    getPlayerListResponse,
    getPlayerResponse,
    servePlayers,
    getPlayerJSON,
    serveDetails,
} from './functions/playerFunctions';
import { getUserNameFromkSesionStorage, checkSesionStorage, logOut } from './functions/registerFunctions';
import { playerCheckFavorite, playerSetFavorite } from './functions/detailFunctions';
import { Player } from './classes/Player';

const teams = [];
const header = document.querySelector('header');
const teamsList = document.getElementById('teamsList');
const playersList = document.querySelector('#playerList');
const playerDetailDiv = document.querySelector('#playerDetail');
const usarname = header.querySelector('#username');
const logout = header.querySelector('button');
let presentPlayer;

document.addEventListener('DOMContentLoaded', async () => {
    if (checkSesionStorage()) {
        usarname.text = getUserNameFromkSesionStorage();
        const resp = await getTeams();
        teams.push(...resp.msg.response);
        console.log(teams);
        serveTeams(teams, teamsList);
    } else {
        window.location.href = 'index.html';
    }
});

logout.addEventListener('click', () => {
    logOut();
    window.location.href = 'index.html';
});

// get team players
teamsList.addEventListener('click', async (e) => {
    console.log(e.target);
    const item = e.target.closest('.team_item');
    if (item) {
        const id = item.getAttribute('name');
        // console.log(item);
        // console.log(id);

        const response = await getPlayerListResponse(id);
        if (response.status !== 404) {
            // console.log(response.msg);
            const playersResponse = response.msg.response;
            const players = [];
            for (const pItem of playersResponse) {
                const playerObj = {
                    id: pItem.player.id,
                    name: pItem.player.name,
                    firstName: pItem.player.firstname,
                    lastName: pItem.player.lastname,
                    photo: pItem.player.photo,
                };
                players.push(playerObj);
            }
            servePlayers(players, playersList);
        } else {
            console.log(response.status);
        }
    }
});

// get player detail
playersList.addEventListener('click', async (e) => {
    // console.log(e.target);
    const item = e.target.closest('.player_item');
    // console.log(item.getAttribute('name'));
    if (item) {
        const idPlayer = item.getAttribute('name');
        const response = await getPlayerJSON(idPlayer);
        if (response.status !== 404) {
            console.log(response.msg);
            // const playersResponse = response.msg.response;
            const playersResponse = response.msg;
            console.log(playersResponse.player.id);

            const playerObj = {
                id: playersResponse.player.id,
                name: playersResponse.player.name,
                firstName: playersResponse.player.firstname,
                lastName: playersResponse.player.lastname,
                age: playersResponse.player.age,
                photo: playersResponse.player.photo,
                team: playersResponse.statistics[0].team.id,
                shots: playersResponse.statistics[0].shots,
                passes: playersResponse.statistics[0].passes,
                duels: playersResponse.statistics[0].duels,
                dribbles: playersResponse.statistics[0].dribbles,
                position: playersResponse.statistics[0].games.position,

            };
            console.log(playersResponse.statistics[0].team.id);

            // console.log(JSON.stringify(playerObj));

            presentPlayer = new Player(playerObj);
            console.log(presentPlayer);
            serveDetails(presentPlayer, playerDetailDiv);
        } else {
            console.log(response.status);
        }
    }
});

playerDetailDiv.addEventListener('click', (e) => {
    if (e.target.matches('#divStar, svg')) {
        const starIcon = playerDetailDiv.querySelector('svg');
        const iconDiv = playerDetailDiv.querySelector('#divStar');
        iconDiv.removeChild(starIcon);
        iconDiv.insertAdjacentHTML('beforeend', playerSetFavorite(presentPlayer));
    }
});