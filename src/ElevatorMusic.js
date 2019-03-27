class ElevatorMusic {
    constructor(player) {
        this.player = player;
        this.wrap = this.wrap.bind(this);
    }

    wrap(fn) {
        const self = this;

        return async () => {
            self.player.start();
            try {
                return await fn();
            } catch(e) {
                throw(e);
            } finally {
                self.player.stop();
            }
        };
    }
}

module.exports = ElevatorMusic;
