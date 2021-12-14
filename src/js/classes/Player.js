// eslint-disable-next-line import/prefer-default-export
export class Player {
    constructor(playerObj) {
        this.id = playerObj.id;
        this.name = playerObj.name;
        this.firstName = playerObj.firstName;
        this.lasttName = playerObj.lastName;
        this.age = playerObj.age;
        this.photo = playerObj.photo;
        // this.team = playerObj.team;
    }
}