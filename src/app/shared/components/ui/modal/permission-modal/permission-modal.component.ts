import { Component, EventEmitter, HostListener, Output } from '@angular/core';

import { permissions } from '../../../../data/user';
import { Module } from '../../../../interface/user';
import { OutsideDirective } from '../../../../directives/outside.directive';

@Component({
  selector: 'app-permission-modal',
  imports: [OutsideDirective],
  templateUrl: './permission-modal.component.html',
  styleUrl: './permission-modal.component.scss'
})

export class PermissionModalComponent {

  @Output() modalOpen = new EventEmitter<boolean>();

  public permissions = permissions;
  public selectedPermission: number[] = [];

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  closeModal() {
    this.modalOpen.emit(false);
  }

  checkUncheckAll(event: Event, module: Module) {
    module.module_permission.forEach(item => {
      item.is_checked = (<HTMLInputElement>event.target).checked;
      this.addPermission((<HTMLInputElement>event.target).checked, item?.id, module);
    });
  }

  onPermissionChecked(event: Event, module: Module) {
    module.module_permission.forEach(item => {
      item.is_checked = false
      if(item.name == 'index'){
        item.is_checked = !item.is_checked ? true : false;
        this.addPermission(true, +item.id, module);
      }
      this.addPermission((<HTMLInputElement>event.target)?.checked, +(<HTMLInputElement>event?.target)?.value, module);
    })
  }

  addPermission(checked: Boolean, value: number, module: Module) {
    const index = this.selectedPermission.indexOf(Number(value));
    if(checked) {
      if(index == -1) this.selectedPermission.push(Number(value)) ;
    } else {
      this.selectedPermission = this.selectedPermission.filter(id => id != Number(value));
    }
    this.updateCheckBoxStatus(module);
  }

  updateCheckBoxStatus(module: Module) {
    let count = 0;
    module.module_permission.filter(permission => {
      if(this.selectedPermission.includes(permission.id!)) {
        count++;
      }
      if(module.module_permission.length <= count)
        module.is_checked = true;
      else
        module.is_checked = false;
    });
  }

}
