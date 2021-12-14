// eslint-disable-next-line import/prefer-default-export
export class Team {
    constructor(teamObj) {
        this.players = teamObj.players;
    }

    addPlayer(p) {
        this.players.push(p);
    }
}