import { Injectable } from "@angular/core";

import { tasks } from "../data/tasks";
import { TableConfigs } from "../interface/common";
import { Task } from "../interface/tasks";
import { ChatService } from "./chat.service";

@Injectable({
    providedIn: 'root'
})

export class TaskService {

    public tasks = tasks;
    public tableConfig: TableConfigs = {
        columns: [
            { title: 'Task Name', field_value: 'task_name', sort: true },
            { title: 'Task Details', field_value: 'task_details', sort: true },
            { title: 'Due Date', field_value: 'due_date', sort: true },
            { title: 'Assign To', field_value: 'assign_to' },
            { title: 'Status', field_value: 'status', sort: true },
            { title: 'Importance', field_value: 'importance', sort: true },
        ],
        data: [] as Task[]
    };

    public filter = {
        status: '',
        importance: ''
    };

    constructor(private chatService: ChatService) {
        this.tableConfig.data = this.formatTask(this.tasks)
    }

    formatTask(tasks: Task[]) {
        return tasks.map((task: Task) => {
            const formattedTask = { ...task };
            formattedTask.task_details = `<span>${task.task_details}</span>`;

            let taskAssign = '';
            for (let i = 0; i < task.assign_to.length; i++) {

                if (task.assign_to[i]['profile']) {
                    taskAssign += `<li>
                                <img class="common-circle" src="${task.assign_to[i]['profile']}" alt="user">
                            </li>`;
                } else {
                    taskAssign += `<li> 
                                <div class="common-circle bg-lighter-${this.chatService.getTextColor(this.chatService.getUserText(task.assign_to[i]['name']))}">${this.chatService.getUserText(task.assign_to[i]['name'], 'singleText')}</div>
                            </li>`
                }
            }
            formattedTask.assign_to = `<ul class="common-f-start">
                                        ${taskAssign}
                                    </ul>`


            formattedTask.status = `<span class="badge badge-light-${task.status == 'Pending' ? 'warning' :
                task.status == 'In Progress' ? 'primary' :
                    task.status == 'On Hold' ? 'secondary' :
                        task.status == 'Completed' ? 'success' : ''
                }">${task.status}</span>`;

            formattedTask.importance = `<span class="btn badge-light-${task.importance == 'Low' ? 'primary' :
                task.importance == 'Medium' ? 'warning' :
                    task.importance == 'High' ? 'danger' : ''
                }">${task.importance}</span>`
            return formattedTask;
        });
    }

    handleStatus(value: string) {
        this.filter['status'] = value;
        this.tableConfig = { ...this.tableConfig, data: this.formatTask(this.filterDetails()) };
    }

    handleImportance(value: string) {
        this.filter['importance'] = value;
        this.tableConfig = { ...this.tableConfig, data: this.formatTask(this.filterDetails()) };
    }

    filterDetails() {
        return this.tasks.filter(task => {
            const matchStatus = this.filter['status']
                ? task.status === this.filter['status']
                : true;
            const matchImportance = this.filter['importance']
                ? task.importance === this.filter['importance']
                : true;

            return matchStatus && matchImportance;
        });
    }
}