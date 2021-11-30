import { getTeams } from './functions/teamsFunctions';

console.log('teams');
const teams = [];
document.addEventListener('click', async () => {
    console.log('call');
    const resp = await getTeams();
    teams.push(...resp.msg.response);
    console.log(teams);
});
