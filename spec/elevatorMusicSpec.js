const ElevatorMusic = require("../src/ElevatorMusic");

async function eventualResultOf(p) {
    try {
        return {
            value: await Promise.resolve(p),
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
            let wrappedFunction;
            let wrapper;

            beforeEach(() => {
                wrappedFunction = jasmine.createSpy(fn.name);
                wrappedFunction.and.callFake(fn);

                wrapper = wrap(wrappedFunction);
            });

            it("wraps the provided function", async () => {
                const result = await eventualResultOf(wrapper());

                expect(wrappedFunction).toHaveBeenCalled();
                expect(result).toEqual(await eventualResultOf(fn()));
            });

            it("starts and stops the player", async () => {
                await eventualResultOf(wrapper());

                expect(player.start).toHaveBeenCalled();
                expect(player.stop).toHaveBeenCalled();
            });
        });
    }

    verifyWrapping(function doWorkNow() { return "done!" });
    verifyWrapping(function doWorkEventually() { return Promise.resolve("done!") });
    verifyWrapping(function failEventually() { return Promise.reject("oops!!!") });
});
