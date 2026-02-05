import {Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-modal',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './role-modal.component.html',
  styleUrl: './role-modal.component.scss',
})
export class RoleModalComponent implements OnChanges {
  @Output() modalOpen = new EventEmitter<boolean>();
  @Input() dataLigne: any;

  public validationForm = new FormGroup({
    libelle_role: new FormControl('', Validators.required),
    uid: new FormControl(''),
    code_role: new FormControl(''),
  })

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  isloading: boolean = false;
  users: any = [];
  errorTexte: string = "";

  constructor(private autor: Authorization, private httService: HttpService) {
    this.users = this.autor.getInfosUsers();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataLigne'] && changes['dataLigne']?.currentValue) {
      this.validationForm.patchValue(changes['dataLigne']?.currentValue);
    }
  }

  submitForm() {
    this.errorTexte = '';
    this.validationForm.markAllAsTouched();
    if (!this.validationForm.valid) {
      return;
    }

    this.isloading = true;
    let payload = {
      "action": this.validationForm.value.uid ? 2 : 1,
      "idsociete": this.users?.dataSociete?.uid,
      "idrole": this.validationForm.value.uid || '',
      "code_role": !this.validationForm.value.uid ? this.generateCode(6): this.validationForm.value.code_role,
      "libelle_role": this.validationForm.value.libelle_role
    }
    console.log("payload ===", payload)
    this.httService.postData(`${environment.api_url}auth/:saveroles`, payload, this.users?.access_token || '')
        .toPromise()
        .then((res: any) => {
          this.isloading = false;
          if (res.body.status) {
            this.dataLigne = {};
            this.validationForm.reset({});
            this.closeModal(true);
            Swal.fire({
              title: res?.body?.message,
              icon: 'success',
              confirmButtonText: 'OK'
            })
          }
        })
        .catch((err) => {
          this.isloading = false;
          this.errorTexte = err?.error?.err?.message || "Une erreur est survenue !"
          this.isloading = false;
        });
  }
  generateCode(length: number): string {
    return Math.floor(Math.random() * Math.pow(10, length))
        .toString()
        .padStart(length, '0');
  }

  closeModal(e?: boolean) {
    this.modalOpen.emit(e || false);
  }
}