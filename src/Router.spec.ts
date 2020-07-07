import { mocked } from "ts-jest/utils";
import { Router } from "./Router";

jest.mock("../src/Router", () => {
  return {
    Router: jest.fn().mockImplementation(() => {
      return {
        getParam: (key: string) => {},
      };
    }),
  };
});

describe("RouterConsumer", () => {
  const MockedRouter = mocked(Router, true);

  beforeEach(() => {
    MockedRouter.mockClear();
  });

  it("Check if class constructor was called", () => {
    const routerConsumer = new Router();
    expect(MockedRouter).toHaveBeenCalledTimes(1);
  });
});
