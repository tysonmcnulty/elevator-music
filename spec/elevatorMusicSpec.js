const { wrap } = require("../src/ElevatorMusic");

describe("elevator music", () => {
    const verifyWrapping = (name, returnValue) => describe(`function wrapping: ${name}`, () => {
        let wrappedFunction;

        beforeEach(() => {
            wrappedFunction = jasmine.createSpy(name);
            wrappedFunction.and.returnValue(returnValue);;
        });

        it("wraps the provided function", async () => {
            const wrapper = wrap(wrappedFunction);

            const result = await wrapper();

            expect(wrappedFunction).toHaveBeenCalled();
            expect(result).toEqual(await returnValue);
        });
    });

    verifyWrapping("doWorkNow", "done");
    verifyWrapping("doWorkEventually", Promise.resolve("done"));
});
