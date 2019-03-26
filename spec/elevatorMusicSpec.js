const ElevatorMusic = require("../src/ElevatorMusic");

describe("elevator music", () => {
    let player;
    let wrap;

    beforeEach(() => {
        player = jasmine.createSpyObj("player", ["start", "stop"]);
        wrap = new ElevatorMusic(player).wrap;
    });

    const verifyWrapping = (name, returnValue) => describe(`function wrapping: ${name}`, () => {
        let wrappedFunction;
        let wrapper;

        beforeEach(() => {
            wrappedFunction = jasmine.createSpy(name);
            wrappedFunction.and.returnValue(returnValue);

            wrapper = wrap(wrappedFunction);
        });

        it("wraps the provided function", async () => {
            const result = await wrapper();

            expect(wrappedFunction).toHaveBeenCalled();
            expect(result).toEqual(await returnValue);
        });

        it("starts and stops the player", async () => {
            await wrapper();

            expect(player.start).toHaveBeenCalled();
            expect(player.stop).toHaveBeenCalled();
        })
    });

    verifyWrapping("doWorkNow", "done");
    verifyWrapping("doWorkEventually", Promise.resolve("done"));
});
