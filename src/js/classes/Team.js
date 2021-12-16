// eslint-disable-next-line import/prefer-default-export
export class Team {
    constructor() {
        this.players = [];
    }

    save() {
        try {
            localStorage.setItem('team', JSON.stringify(this));
            return { status: true };
        } catch (e) {
            return { status: false, error: e };
        }
    }

    get() {
        try {
            const team = JSON.parse(localStorage.getItem('team'));
            this.players = team.players;
            return { status: true };
        } catch (e) {
            return { status: false, error: e };
        }
    }

    countPosition(position) {
        return this.players.filter((item) => item.position === position).length;
    }

    addPlayer(p) {
        if (this.players.length < 11) {
            switch (p.position) {
            case 'Goalkeeper':
                if (this.countPosition('Goalkeeper') < 1) {
                    this.players.push(p);
                    return { status: true, msg: '' };
                }
                break;
            case 'Defender':
                if (this.countPosition('Defender') < 5) {
                    this.players.push(p);
                    return { status: true, msg: '' };
                }
                break;
            case 'Midfielder':
                if (this.countPosition('Midfielder') < 5) {
                    this.players.push(p);
                    return { status: true, msg: '' };
                }
                break;
            case 'Attacker':
                if (this.countPosition('Attacker') < 3) {
                    this.players.push(p);
                    return { status: true, msg: '' };
                }
                break;
            default:
                break;
            }
            return { status: false, msg: 'Position Full' };
        }
        return { status: false, msg: 'Team Full' };
    }

    removePlayer(pId) {
        // eslint-disable-next-line eqeqeq
        this.players = this.players.filter((elem) => elem.id != pId);
    }
}