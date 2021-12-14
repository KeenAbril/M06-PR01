import { getTeams, serveTeams } from './functions/teamsFunctions';
import { getPlayerListResponse, getPlayerResponse, servePlayers, playerCheckFavorite, playerSetFavorite } from './functions/playerFunctions';
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
<div name="$$ITEM_ID$$" class='detail_item'>
<img src="$$ITEM_PHOTO$$">
<p>Nombre: $$ITEM_FIRSTNAME$$</p>
<p>Apellido: $$ITEM_LASTNAME$$</p>
<p> Edad: $$ITEM_AGE$$</p>
<div id="divStar">
    $$ITEM_STAR$$
</div>
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
                    firstName: pItem.player.firstname,
                    lastName: pItem.player.lastname,
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
                firstName: playersResponse.player.firstname,
                lastName: playersResponse.player.lastname,
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
                .replace('$$ITEM_FIRSTNAME$$', player.firstName)
                .replace('$$ITEM_LASTNAME$$', player.lasttName)
                .replace('$$ITEM_STAR$$', playerCheckFavorite(player));
            playerDetailDiv.innerHTML = '';
            playerDetailDiv.insertAdjacentHTML('beforeend', replacedItemHTML);

            const iconDiv = playerDetailDiv.querySelector('#divStar');
            console.log(iconDiv);
            iconDiv.addEventListener('click', () => {
                const starIcon = iconDiv.querySelector('svg');
                console.log('holas');

                iconDiv.removeChild(starIcon);
                iconDiv.insertAdjacentHTML('beforeend', playerSetFavorite(player));
                //console.log(detail.lastChild);
            });
        } else {
            console.log(response.status);
        }
    }
})