import { Todo, TodoSidebar } from "../interface/todos"

export const sidebar: TodoSidebar[] = [
    {
        id: 1,
        title: 'All Tasks',
        value: 'all',
        icon: 'file-plus',
        color: 'primary'
    },
    {
        id: 2,
        title: 'Completed',
        value: 'completed',
        icon: 'check-circle',
        color: 'success'
    },
    {
        id: 3,
        title: 'Pending',
        value: 'pending',
        icon: 'cast',
        color: 'danger'
    },
    {
        id: 4,
        title: 'In Process',
        value: 'in_progress',
        icon: 'activity',
        color: 'info'
    },
    {
        id: 5,
        title: 'Trash',
        value: 'trash',
        icon: 'trash',
        color: 'danger'
    }
]

export const todos: Todo[] = [
    {
        id: 1,
        task: 'Update all admin themes',
        status: 'completed',
        date: '25/01/2025'
    },
    {
        id: 2,
        task: 'Prepare a summary presentation for the stakeholders and finish the in-depth analysis for the quarterly financial report.',
        status: 'pending',
        date: '12/01/2025'
    },
    {
        id: 3,
        task: 'Review project documentation',
        status: 'pending',
        date: '01/07/2024'
    },
    {
        id: 4,
        task: 'Plan out and complete the weekend\'s events, including any planned excursions, get-togethers, and downtime.',
        status: 'completed',
        date: '28/02/2024'
    }
]