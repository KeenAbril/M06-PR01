/* eslint-disable import/prefer-default-export */
export async function getPlayerListResponse(teamId) {
    try {
        //COMO SE HARIA CON LA API
        /* // eslint-disable-next-line no-undef
        const response = await fetch(`https://v3.football.api-sports.io/players?league=140&season=2020&team=${teamId}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': '5facc982b3550bc6d921ae7ec95fb7e3',
            },
        });
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        // axios retorna els valors com a objecte amb data com a json */

        const response = await fetch('../json/Players.json');
        const data = await response.json();

        return { status: response.status, msg: data };
    } catch (e) {
        return { status: false, msg: e };
    }
}

export async function getPlayerResponse(playerId) {
    try {
        /* // eslint-disable-next-line no-undef
        const response = await fetch(`https://v3.football.api-sports.io/players?id=${playerId}&league=140&season=2020`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': '5facc982b3550bc6d921ae7ec95fb7e3',
            },
        });
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        // axios retorna els valors com a objecte amb data com a json */
        const response = await fetch('../json/Players.json');
        const data = await response.json();

        return { status: response.status, msg: data };
    } catch (e) {
        return { status: false, msg: e };
    }
}

export function servePlayers(players, ul) {
    ul.innerHTML = '';
    const playerList = `
    <li name="$$ITEM_ID$$" class='list-group-item player_item'>
        <div>
            <img src="$$ITEM_PHOTO$$">
            <a>$$ITEM_NAME$$</a>
        </div>
    </li>
    `;
    for (const player of players) {
        // const playerObj = {
        //     id: players[i].player.id,
        //     name: players[i].player.name,
        //     photo: players[i].player.photo,
        // };
        // console.log(JSON.stringify(playerObj));
        // const player = new Player(playerObj);
        const replacedItemHTML = playerList.replace('$$ITEM_ID$$', player.id).replace('$$ITEM_PHOTO$$', player.photo).replace('$$ITEM_NAME$$', player.name);
        ul.insertAdjacentHTML('beforeend', replacedItemHTML);
    }
}