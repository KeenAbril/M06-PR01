// eslint-disable-next-line import/prefer-default-export
export async function getTeams() {
    try {
        //COMO SE HARIA CON LA API
        /* const response = await fetch('https://v3.football.api-sports.io/teams?league=140&season=2020', {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '5facc982b3550bc6d921ae7ec95fb7e3',
                'x-rapidapi-host': 'v3.football.api-sports.io',
            },
        }); */

        const response = await fetch('../json/Teams.json'); 

        const data = await response.json();

        console.log(data);
        return { status: response.status, msg: data };
    } catch (error) {
        return { status: false, msg: error };
    }
}

export function serveTeams(teams, teamsList) {
    for (const team of teams) {
        const item = `
        <li class='team_item list-group-item' name=${team.team.id}>
            <div style=" cursor: pointer;">
                <img style="height: 4em;" 
                src="https://media.api-sports.io/football/teams/${team.team.id}.png" alt="">
                ${team.team.name}
            </div>
        </li>`;
        teamsList.insertAdjacentHTML('beforeend', item);
    }
}
