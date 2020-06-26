import { Form } from "./Form.js";

export class App {
  form: Form;

  constructor() {
    this.form = new Form();
  }
  
}

let app = new App();