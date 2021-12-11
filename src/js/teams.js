import { getTeams, serveTeams } from './functions/teamsFunctions';
import { getPlayerListResponse, getPlayerResponse, servePlayers, playerCheckFavorite, playerSetFavorite } from './functions/playerFunctions';
import { Player } from './classes/Player';

console.log('teams');
const teams = [];
const teamsList = document.getElementById('teamsList');
const playersList = document.querySelector('#playerList');
const playerDetailDiv = document.querySelector('.playerDetail');
const starIcon;

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
<div name="$$ITEM_ID$$" class='detail_item'>
<img src="$$ITEM_PHOTO$$">
<p>$$ITEM_NAME$$</p>
<p> Edad: $$ITEM_AGE$$</p>
$$ITEM_STAR$$
</div>
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
    console.log(item.getAttribute('name'));
    if (item) {
        const idPlayer = item.getAttribute('name');
        const response = await getPlayerResponse(idPlayer);
        if (response.status !== 404) {
            console.log(response.msg);
            const playersResponse = response.msg.response[0];

            console.log(playersResponse.player.id);

            const playerObj = {
                id: playersResponse.player.id,
                name: playersResponse.player.name,
                age: playersResponse.player.age,
                photo: playersResponse.player.photo,
                //team: id,
            };

            console.log(2);

            console.log(JSON.stringify(playerObj));

            const player = new Player(playerObj);

            const replacedItemHTML = playerDetail.replace('$$ITEM_ID$$', player.id)
                .replace('$$ITEM_AGE$$', player.age)
                .replace('$$ITEM_PHOTO$$', player.photo)
                .replace('$$ITEM_NAME$$', player.name)
                .replace('$$ITEM_STAR$$', playerCheckFavorite);
            playerDetailDiv.innerHTML = '';
            playerDetailDiv.insertAdjacentHTML('beforeend', replacedItemHTML);

            starIcon = playerDetailDiv.querySelector('svg');
        } else {
            console.log(response.status);
        }
    }
})

starIcon.addEventListener('click', (e) => {
    const item = e.target.closest('.detail_item');
    if (item) {
        const idPlayer = item.getAttribute('name');
        item.removeChild(item.lastChild);
        item.insertAdjacentHTML('beforeend', playerSetFavorite(idPlayer));
    }
});