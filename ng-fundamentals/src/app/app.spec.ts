describe("App", () => {
  let sut;

  beforeEach(() => {
    sut = {};
  });

  it("should run unit tests", () => {
    //arrange
    sut.runningUnitTests = false;
    //act
    sut.runningUnitTests = true;
    //assert
    expect(sut.runningUnitTests).toBe(true);
  });
});
