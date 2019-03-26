const ElevatorMusic = require("../src/ElevatorMusic");

describe("elevator music", () => {
    it("wraps the provided function", async () => {
        const doWorkNow = jasmine.createSpy("doWorkNow");
        doWorkNow.and.returnValue("done");
        const wrapper = ElevatorMusic.wrap(doWorkNow);

        const result = await wrapper();

        expect(doWorkNow).toHaveBeenCalled();
        expect(result).toEqual("done");
    });

    it("wraps an asynchronous function", async () => {
        const doWorkEventually = jasmine.createSpy("doWorkEventually");
        doWorkEventually.and.returnValue(Promise.resolve("done"));
        const wrapper = ElevatorMusic.wrap(doWorkEventually);

        const result = await wrapper();

        expect(doWorkEventually).toHaveBeenCalled();
        expect(result).toEqual("done");
    });
});
