
import { DragTarget} from '../models/drag-drop.js'
import { Component } from './base-components.js';
import { Project } from '../models/project.js';
import { autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';
import { ProjectStatus } from '../models/project.js';
import { ProjectItem } from './project-item.js';

// ProjectList Class


    export class ProjectList extends Component<HTMLDivElement,HTMLElement> implements DragTarget {
        assignProjects: Project[] = [];
        constructor(private type: 'active' | 'finished') {
        super('project-list','app', false,`${type}-projects`);
        this.assignProjects = []
        this.configure();
        this.renderContent();
        }

        @autobind
        dragOverHandler(event:DragEvent){
        if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){
        event.preventDefault();
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.add('droppable');
        }
    }
        @autobind
        dragLeaveHandler(_:DragEvent){
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
        }

        @autobind
        dropHandler(event:DragEvent){
        const projId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(projId, this.type === 'active' ? ProjectStatus.active : ProjectStatus.finished)
        }

        configure(){
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        projectState.addListener((projects: Project[])=>{
            const relevantProjects = projects.filter((prj) => {
            if(this.type === 'active'){
            return prj.status === ProjectStatus.active
            }
            return prj.status === ProjectStatus.finished
            });
            this.assignProjects = relevantProjects;
            this.renderProjects();
        });
        }

        renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent =
            this.type.toUpperCase() + ' PROJECTS';
        }

        private renderProjects(){
        const listEl =
        document.getElementById(`${this.type}-projects-list`
        )! as HTMLUListElement;
        listEl.innerHTML = '';
        for(const prjItem of this.assignProjects){
            new ProjectItem(this.element.querySelector('ul')!.id,prjItem)
        }
        }
    }
