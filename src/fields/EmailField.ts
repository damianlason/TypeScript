import { Field } from "../interfaces/Field";

export class EmailField implements Field {
  name: string;
  label: string;
  type: import("../enums/FieldType").FieldType;
  value: string;
  render: () => HTMLDivElement;
}
