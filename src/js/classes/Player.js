// eslint-disable-next-line import/prefer-default-export
export class Player {
    constructor(playerObj) {
        this.id = playerObj.player.id;
        this.name = playerObj.player.name;
        this.photo = playerObj.player.photo;
        this.team = playerObj.static.team.id;
    }
}