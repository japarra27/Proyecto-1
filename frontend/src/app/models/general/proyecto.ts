export interface ProyectoI {
    id: 2;
    project_name: string;
    project_description: string;
    project_price: string;
}
export class ProyectoModel implements ProyectoI{
    id: 2;
    project_name: string;
    project_description: string;
    project_price: string;
    constructor(){
        this.id = 2;
        this.project_name = '';
        this.project_description = '';
        this.project_price = '';
    }
}
