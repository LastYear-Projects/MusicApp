

beforeAll(done => {
  // ...
  done();
});

afterAll(done => {
  // ...
  done();
});
describe('this is the first test case', () => {
    test("this is the first test case", () => {
        const temp=2;
        expect(temp).toBe(2);
    })
    test("this is the second test case should pass", () => {
        const temp=2
        expect(temp).not.toBe(3)

    })
})