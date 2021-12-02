import { getTeams, serveTeams } from './functions/teamsFunctions';

console.log('teams');
const teams = [];
const list = document.getElementById('teamsList');

document.addEventListener('DOMContentLoaded', async () => {
    console.log('call');
    const resp = await getTeams();
    teams.push(...resp.msg.response);
    console.log(teams);
    serveTeams(teams, list);
});

list.addEventListener('click', (e) => {
    console.log(e.target);
    const item = e.target.closest('.team_item');
    if (item) {
        const id = item.getAttribute('name');
        console.log(item);
        console.log(id);
    }
});
