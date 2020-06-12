import { Field } from "../interfaces/Field";

export class SelectField implements Field {
  name: string;
  label: string;
  type: import("../enums/FieldType").FieldType.Select;
  value: string;
  render: () => HTMLDivElement;

  constructor(name: string, label: string, value: string) {
    this.name = name;
    this.label = label;
    this.value = value;
  }
}
