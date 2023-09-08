/// <reference path="component/project-item.ts" />
/// <reference path="component/project-list.ts" />
/// <reference path="component/project-input.ts" />
/// <reference path="decorators/autobind-decorator.ts" />
/// <reference path="models/drag-drop.ts" />
/// <reference path="models/project.ts" />
/// <reference path="state/project-state.ts" />
/// <reference path="util/validation.ts" />


namespace App {

  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');


}

