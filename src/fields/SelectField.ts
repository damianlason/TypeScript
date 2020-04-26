import { Field } from "../interfaces/Field";

export class SelectField implements Field {
  name: string;
  label: string;
  type: import("../enums/FieldType").FieldType;
  value: string;
  render: () => HTMLDivElement;
}
