class ElevatorMusic {
    constructor(player) {
        this.player = player;
        this.wrap = this.wrap.bind(this);
    }

    wrap(fn) {
        const self = this;

        return async () => {
            self.player.start();
            const result = await fn();
            self.player.stop();
            return result;
        }
    }
}

module.exports = ElevatorMusic;
