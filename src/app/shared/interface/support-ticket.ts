export interface SupportDB {
    id: number,
    img: string;
    name: string;
    position: string;
    salary: string;
    office: string;
    skill: string;
    progress: any;
    extn: number;
    email: string;
}

export interface TicketListStatus{
    status_title: string;
    order:  string;
    profit: number;
    loss: number;
    level:  string;
    level_color: string;
}