import { mocked } from "ts-jest/utils";
import { FormCreator } from "./FormCreator";
import { FieldType } from "./enums/FieldType";
import { Form } from "./Form";
import { Field } from "./interfaces/Field";

jest.mock("../src/FormCreator", () => {
  return {
    FormCreator: jest.fn().mockImplementation(() => {
      return {
        newForm: () => {},
        addElement: (field: Field) => {},
        createField: (name: string, label: string, type: FieldType) => {},
      };
    }),
  };
});

describe("FormCreatorConsumer", () => {
  const MockedFormCreator = mocked(FormCreator, true);

  beforeEach(() => {
    MockedFormCreator.mockClear();
  });

  it("Check if class constructor was called", () => {
    const FormCreatorConsumer = new FormCreator();
    expect(MockedFormCreator).toHaveBeenCalledTimes(1);
  });

  it("Check if createField method is defined", () => {
    const FormCreatorConsumer = new FormCreator();
    expect(FormCreatorConsumer.createField).toBeDefined();
  });

  it("Check if newForm method is defined", () => {
    const FormCreatorConsumer = new FormCreator();
    expect(FormCreatorConsumer.newForm).toBeDefined();
  });

  it("Check if addElement method is defined", () => {
    const FormCreatorConsumer = new FormCreator();
    expect(FormCreatorConsumer.addElement).toBeDefined();
  });
});
