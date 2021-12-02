import { getPlayerResponse } from './functions/playerFunctions';

const formPlayer = document.getElementById('formPlayer');

const playerList = `
    <li>
        <div>
            <p>$$ITEM_NAME$$</p>
        </div>
    </li>
`;

const ul = document.querySelector('ul');

formPlayer.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('1');
    
    const response = await getPlayerResponse(formPlayer.team.value);
    if (response.status !== 404) {
        console.log(response.msg);
        const players = response.msg.response;

        for (let i = 0; i < players.length; i++) {
            const replacedItemHTML = playerList.replace('$$ITEM_NAME$$', JSON.stringify(players[i].player));
            ul.insertAdjacentHTML('beforeend', replacedItemHTML);    
        }
    } else {
        console.log(response.status);
    }
});