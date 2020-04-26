import { FieldType } from "./../enums/FieldType";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  value: string;
  render: () => HTMLDivElement;
}
