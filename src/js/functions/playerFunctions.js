/* eslint-disable import/prefer-default-export */
export async function getPlayerResponse(team) {
    try {
        // eslint-disable-next-line no-undef
        const response = await fetch(`https://v3.football.api-sports.io/players?league=140&season=2020&team=${team}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': '2adf16fc3279e2deeaf8c3e88dd13790',
            },
        });
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        // axios retorna els valors com a objecte amb data com a json

        return { status: response.status, msg: data };
    } catch (e) {
        return { status: false, msg: e };
    }
}