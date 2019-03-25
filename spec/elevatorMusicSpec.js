const ElevatorMusic = require("../src/ElevatorMusic");

describe("elevator music", () => {
    it("wraps the provided function", () => {
        const doWork = jasmine.createSpy("doWork");

        const wrapper = ElevatorMusic.wrap(doWork);

        wrapper();

        expect(doWork).toHaveBeenCalled();
    });
});
