import { getTeams, serveTeams } from './functions/teamsFunctions';
import { getPlayerListResponse, getPlayerResponse, servePlayers} from './functions/playerFunctions';
import { Player } from './classes/Player';

console.log('teams');
const teams = [];
const teamsList = document.getElementById('teamsList');
const playersList = document.querySelector('#playerList');
const playerDetailDiv = document.querySelector('.playerDetail');

document.addEventListener('DOMContentLoaded', async () => {
    console.log('call');
    const resp = await getTeams();
    teams.push(...resp.msg.response);
    console.log(teams);
    serveTeams(teams, teamsList);
});

const playerList = `
    <li name="$$ITEM_ID$$" class='list-group-item player_item'>
        <div>
            <img src="$$ITEM_PHOTO$$">
            <a>$$ITEM_NAME$$</a>
        </div>
    </li>
`;

const playerDetail = `
    <li name="$$ITEM_ID$$" class='list-group-item'>
        <div>
            <img src="$$ITEM_PHOTO$$">
            <a>$$ITEM_NAME$$</a>
        </div>
    </li>
`;

// get team players
teamsList.addEventListener('click', async (e) => {
    console.log(e.target);
    const item = e.target.closest('.team_item');
    if (item) {
        const id = item.getAttribute('name');
        console.log(item);
        console.log(id);

        const response = await getPlayerListResponse(id);
        if (response.status !== 404) {
            console.log(response.msg);
            const playersResponse = response.msg.response;
            const players = [];
            for (const pItem of playersResponse) {
                const playerObj = {
                    id: pItem.player.id,
                    name: pItem.player.name,
                    photo: pItem.player.photo,
                };
                players.push(playerObj);
            }
            servePlayers(players, playersList);
            /* for (let i = 0; i < players.length; i++) {
                const playerObj = {
                    id: players[i].player.id,
                    name: players[i].player.name,
                    photo: players[i].player.photo,
                };

                console.log(JSON.stringify(playerObj));

                const player = new Player(playerObj);

                const replacedItemHTML = playerList.replace('$$ITEM_ID$$', player.id).replace('$$ITEM_PHOTO$$', player.photo).replace('$$ITEM_NAME$$', player.name);
                playersList.insertAdjacentHTML('beforeend', replacedItemHTML);
            } */
        } else {
            console.log(response.status);
        }
    }
});

// get player detail
playersList.addEventListener('click', async (e) => {
    console.log(e.target);
    const item = e.target.closest('.player_item');
    if (item) {
        const idPlayer = item.getAttribute('name');
        const response = await getPlayerListResponse(idPlayer);
        if (response.status !== 404) {
            console.log(response.msg);
            const playersResponse = response.msg.response;

            const playerObj = {
                id: playersResponse[i].player.id,
                name: playersResponse[i].player.name,
                photo: playersResponse[i].player.photo,
                //team: id,
            };

            console.log(JSON.stringify(playerObj));

            const player = new Player(playerObj);

            const replacedItemHTML = playerDetail.replace('$$ITEM_ID$$', player.id).replace('$$ITEM_PHOTO$$', player.photo).replace('$$ITEM_NAME$$', player.name);
            playerDetailDiv.insertAdjacentHTML('beforeend', replacedItemHTML);
        } else {
            console.log(response.status);
        }
    }
})
