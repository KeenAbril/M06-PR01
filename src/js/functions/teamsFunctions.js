// eslint-disable-next-line import/prefer-default-export
export async function getTeams() {
    try {
        const response = await fetch('https://v3.football.api-sports.io/teams?league=140&season=2020', {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'b59de48fa9b382b12b64f470c88cae4c',
                'x-rapidapi-host': 'v3.football.api-sports.io',
            },
        });
        const data = await response.json();
        return { status: response.status, msg: data };
    } catch (error) {
        return { status: false, msg: error };
    }
}

export function serveTeams(teams, teamsList) {
    // https://media.api-sports.io/football/teams/{team_id}.png
    teamsList.innerHTML = '';
    for (const team of teams) {
        const item = `
        <li class='team_item list-group-item' name=${team.team.id}>
            <div>
                <img style="height: 4em;" 
                src="https://media.api-sports.io/football/teams/${team.team.id}.png" alt="">
                ${team.team.name}
            </div>
        </li>`;
        teamsList.insertAdjacentHTML('beforeend', item);
    }
}
