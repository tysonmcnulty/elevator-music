const ElevatorMusic = require("../src/ElevatorMusic");

async function eventualResultOf(fn) {
    try {
        return {
            value: await fn(),
            error: false
        };
    } catch (e) {
        return {
            value: e,
            error: true
        }
    }
}

describe("elevator music", () => {
    let player;
    let wrap;

    beforeEach(() => {
        player = jasmine.createSpyObj("player", ["start", "stop"]);
        wrap = new ElevatorMusic(player).wrap;
    });

    function verifyWrapping(fn) {
        describe(`function wrapping: ${fn.name}`, () => {
            let fnSpy;
            let wrapper;

            beforeEach(() => {
                fnSpy = jasmine.createSpy(fn.name);
                fnSpy.and.callFake(fn);

                wrapper = wrap(fnSpy);
            });

            it("calls the provided function", async () => {
                const result = await eventualResultOf(wrapper);

                expect(fnSpy).toHaveBeenCalled();
                expect(result).toEqual(await eventualResultOf(fn));
            });

            it("starts and stops the player", async () => {
                await eventualResultOf(wrapper);

                expect(player.start).toHaveBeenCalled();
                expect(player.stop).toHaveBeenCalled();
            });
        });
    }

    verifyWrapping(function finishNow() { return "finish now!" });
    verifyWrapping(function finishLater() { return Promise.resolve("finish later!") });
    verifyWrapping(function failNow() { throw "fail now!" });
    verifyWrapping(function failLater() { return Promise.reject("fail later!") });
});
