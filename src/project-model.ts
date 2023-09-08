// Project Type
enum ProjectStatus {active, finished}

class Project {
    constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus){
    }
}