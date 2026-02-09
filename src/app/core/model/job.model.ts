export interface JobLocation{
    name: string;
}

export interface JobLevel{
    name: string;
    short_name: string;
}

export interface JobCompany{
    id: number;
    name: string;
    short_name: string;
}

export interface JobRefs{
    landing_page:string
}

export interface Job{
    id:number;
    name: string;
    short_name: string;
    type: string;
    publication_date: string;
    contents: string;
    locations: JobLocation[];
    levels: JobLevel[];
    company: JobCompany[];
    categories: string[];
    tags: string[];
    refs: JobRefs;
}