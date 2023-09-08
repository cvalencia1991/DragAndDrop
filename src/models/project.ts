// Project Type

namespace App {
    export enum ProjectStatus {active, finished}

    export class Project {
        constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus){
        }
    }

}
