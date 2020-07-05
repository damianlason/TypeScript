import { Form } from "./Form.js";
import { DocumentList } from "./DocumentList.js";
import { FormList } from "./FormList.js";
import { FormCreator } from "./FormCreator.js";

export class App {
  pageId: string | null;
  documentList: DocumentList;
  formList: FormList;
  form: Form;
  formCreator: FormCreator;

  constructor() {
    this.pageId = this.getPageId();
    this.initPage(this.pageId);
  }

  private initPage = (pageId: string | null) => {
    switch (pageId) {
      case "document-list":
        this.documentList = new DocumentList();
        break;
      case "edit-document":
        this.form = new Form();
        this.form.render();
        break;
      case "new-document":
        this.form = new Form();
        this.form.render();
        break;
      case "form-list":
        this.formList = new FormList();
        break;
      case "new-form":
        this.formCreator = new FormCreator();
        break;
      default:
        break;
    }
  };

  private getPageId = (): string | null => {
    const pageBody: HTMLBodyElement = document.querySelector("body")!;
    return pageBody.id;
  };
}

let app = new App();
