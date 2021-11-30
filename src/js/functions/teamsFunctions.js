// eslint-disable-next-line import/prefer-default-export
async function getTeams() {
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
console.log('hola');
const teams = [];
document.addEventListener('DOMContentLoaded', async () => {
    const resp = await getTeams();
    teams.push(...resp.msg.response);
});
console.log(teams);