import { FieldType } from "./../enums/FieldType.js";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  value: string | boolean;
  render: () => HTMLDivElement;
  getValue: () => string | boolean;
}
