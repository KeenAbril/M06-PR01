// eslint-disable-next-line import/prefer-default-export
export class Player {
    constructor(playerObj) {
        this.id = playerObj.id;
        this.name = playerObj.name;
        this.photo = playerObj.photo;
        //this.team = playerObj.team;
    }
}