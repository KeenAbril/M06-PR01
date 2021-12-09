import { getPlayerListResponse } from './functions/playerFunctions';
import { Player } from './classes/Player';

const formPlayer = document.getElementById('formPlayer');

const playerList = `
    <li name="$$ITEM_ID$$" class='list-group-item'>
        <div>
            <img src="$$ITEM_PHOTO$$">
            <a>$$ITEM_NAME$$</a>
        </div>
    </li>
`;

const ul = document.querySelector('#playerList');

formPlayer.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('1');
    
    const response = await getPlayerListResponse(formPlayer.team.value);
    if (response.status !== 404) {
        console.log(response.msg);
        const players = response.msg.response;

        for (let i = 0; i < players.length; i++) {

            const playerObj = {
                id: players[i].player.id,
                name: players[i].player.name,
                photo: players[i].player.photo,
                team: formPlayer.team.value,
            };

            console.log(JSON.stringify(playerObj));

            const player = new Player(playerObj);

            const replacedItemHTML = playerList.replace('$$ITEM_ID$$', player.id).replace('$$ITEM_PHOTO$$', player.photo).replace('$$ITEM_NAME$$', player.name);
            ul.insertAdjacentHTML('beforeend', replacedItemHTML);
        }
    } else {
        console.log(response.status);
    }
});