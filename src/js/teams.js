import { getTeams, serveTeams } from './functions/teamsFunctions';
import { getPlayerResponse } from './functions/playerFunctions';
import { Player } from './classes/Player';

console.log('teams');
const teams = [];
const list = document.getElementById('teamsList');

const playerList = `
    <li name="$$ITEM_ID$$" class='list-group-item'>
        <div>
            <img src="$$ITEM_PHOTO$$">
            <a>$$ITEM_NAME$$</a>
        </div>
    </li>
`;

const ul = document.querySelector('#playerList');

document.addEventListener('DOMContentLoaded', async () => {
    console.log('call');
    const resp = await getTeams();
    teams.push(...resp.msg.response);
    console.log(teams);
    serveTeams(teams, list);
});

list.addEventListener('click', async (e) => {
    console.log(e.target);
    const item = e.target.closest('.team_item');
    if (item) {
        const id = item.getAttribute('name');
        console.log(item);
        console.log(id);

        const response = await getPlayerResponse(id);
        if (response.status !== 404) {
            console.log(response.msg);
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

                const replacedItemHTML = playerList.replace('$$ITEM_ID$$', player.id).replace('$$ITEM_PHOTO$$', player.photo).replace('$$ITEM_NAME$$', player.name);
                ul.insertAdjacentHTML('beforeend', replacedItemHTML);
            }
        } else {
            console.log(response.status);
        }
    }
});
