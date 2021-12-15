/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line no-unused-vars
export async function getPlayerListResponse(teamId) {
    try {
        // COMO SE HARIA CON LA API
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
        // eslint-disable-next-line no-undef
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

        return { status: response.status, msg: data };
    } catch (e) {
        return { status: false, msg: e };
    }
}
export async function getPlayerJSON(playerId) {
    try {
        const response = await fetch('../json/Players.json');
        const data = await response.json();
        for (const playerItem of data.response) {
            // eslint-disable-next-line eqeqeq
            if (playerItem.player.id == playerId) {
                return { status: response.status, msg: playerItem };
            }
        }
        return { status: false, msg: 'not found' };
    } catch (e) {
        return { status: false, msg: e };
    }
}

export function playerCheckFavorite(player) {
    let star = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"  style="cursor: pointer;">
        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
    </svg>
    `;
    const storagePlayers = localStorage.getItem('players');

    if (storagePlayers !== null) {
        const favPlayers = JSON.parse(storagePlayers);

        if (favPlayers.filter((f) => f.id === player.id).length > 0) {
            star = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"  style="cursor: pointer;">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>`;
        }
    }

    return star;
}

export function playerSetFavorite(player) {
    const storagePlayers = localStorage.getItem('players');

    if (storagePlayers == null) {
        const favArray = [player];
        localStorage.setItem('players', JSON.stringify(favArray));
    } else {
        const favPlayers = JSON.parse(storagePlayers);

        if (favPlayers.filter((f) => f.id === player.id).length > 0) {
            localStorage.setItem('players', JSON.stringify(favPlayers.filter((f) => f.id !== player.id)));
        } else {
            favPlayers.push(player);
            localStorage.setItem('players', JSON.stringify(favPlayers));
        }
    }
    return playerCheckFavorite(player);
}

export function servePlayers(players, ul) {
    ul.innerHTML = '';
    const playerList = `
    <li name="$$ITEM_ID$$" class='list-group-item player_item'>
        <div style="cursor: pointer;">
            <img style="height: 4em;" src="$$ITEM_PHOTO$$">
            <a>$$ITEM_NAME$$</a>
        </div>
    </li>
    `;
    for (const player of players) {
        const replacedItemHTML = playerList.replace('$$ITEM_ID$$', player.id).replace('$$ITEM_PHOTO$$', player.photo).replace('$$ITEM_NAME$$', player.name);
        ul.insertAdjacentHTML('beforeend', replacedItemHTML);
    }
}

export function serveDetails(player, div) {
    const playerDetail = `
        <div name="$$ITEM_ID$$" class='detail_item p-3'>
            <div class="d-flex justify-content-center">
                <img src="$$ITEM_PHOTO$$">
            </div>
            
            <div id="divStar" class="star_button">
                $$ITEM_STAR$$
            </div>
            <p>Nombre: $$ITEM_FIRSTNAME$$</p>
            <p>Apellido: $$ITEM_LASTNAME$$</p>
            <p> Edad: $$ITEM_AGE$$</p>
            
        </div>
    `;
    const replacedItemHTML = playerDetail.replace('$$ITEM_ID$$', player.id)
        .replace('$$ITEM_AGE$$', player.age)
        .replace('$$ITEM_PHOTO$$', player.photo)
        .replace('$$ITEM_FIRSTNAME$$', player.firstName)
        .replace('$$ITEM_LASTNAME$$', player.lastName)
        .replace('$$ITEM_STAR$$', playerCheckFavorite(player));
    div.innerHTML = '';
    div.insertAdjacentHTML('beforeend', replacedItemHTML);
}