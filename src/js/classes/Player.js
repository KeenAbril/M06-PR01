// eslint-disable-next-line import/prefer-default-export
export class Player {
    constructor(playerObj) {
        this.id = playerObj.id;
        this.name = playerObj.name;
        this.firstName = playerObj.firstName;
        this.lastName = playerObj.lastName;
        this.age = playerObj.age;
        this.photo = playerObj.photo;
        this.team = playerObj.team;
        this.shots = playerObj.shots;
        this.passes = playerObj.passes;
        this.duels = playerObj.duels;
        this.dribbles = playerObj.dribbles;
        this.position = playerObj.position;
    }

    getPasses() {
        return this.passes.accuracy;
    }

    getKeyPasses() {
        return (this.passes.key / this.passes.total) * 100;
    }

    getShots() {
        return (this.shots.on / this.shots.total) * 100;
    }

    getDribbles() {
        return (this.dribbles.success / this.dribbles.attempts) * 100;
    }

    getDuels() {
        return (this.duels.won / this.duels.total) * 100;
    }
}