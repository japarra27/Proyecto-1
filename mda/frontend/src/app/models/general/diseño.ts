export interface DiseñoI {
    id: number;
    design_creation_date: string;
    designer_first_name: string;
    designer_last_name: string;
    designer_email: string;
    design_file: File;
    design_price: string;
    design_status: string;
}
export class DiseñoModel implements DiseñoI{
    id = 1;
    design_creation_date: string;
    designer_first_name: string;
    designer_last_name: string;
    designer_email: string;
    design_file: File;
    design_price: string;
    design_status: string;
    constructor(){
        this.id = 1;
        this.design_creation_date = '';
        this.designer_first_name = '';
        this.designer_last_name = '';
        this.designer_email = '';
        this.design_file = null ;
        this.design_price = '';
        this.design_status = '';
    }
}
