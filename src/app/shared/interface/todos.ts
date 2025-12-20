export interface TodoSidebar {
    id: number;
    title: string;
    value: string;
    icon: string;
    color: string;
    count?: number;
}

export interface Todo {
    id: number;
    task: string;
    status: string;
    date: string;
}