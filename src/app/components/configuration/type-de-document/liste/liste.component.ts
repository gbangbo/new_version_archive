import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import {environment} from "../../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {Select2Module} from "ng-select2-component";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzTableModule} from "ng-zorro-antd/table";

@Component({
  selector: 'app-liste',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzSwitchModule,
    NzToolTipModule,
    NzSelectModule,
    Select2Module,
    NzTableModule,],
  providers: [],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.scss',
})
export class ListeComponent implements OnInit {
  societeDirection!: FormGroup;
  dataTypeDocument: any = [];


  private users: any = [];
  errorTexte: string = '';
  isloading: boolean = false;
  isLoad: boolean = false;


  constructor(private autor: Authorization,
              private fb: FormBuilder,
              private httService: HttpService,
              private toast: ToastrService) {

  }


  ngOnInit(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.users = this.autor.getInfosUsers();
    this.societeDirection = this.fb.group({
      action: [''],
      iddirection: [''],
      idsociete: [''],
      active: [''],
      sigle_direction: ['', Validators.required],
      libelle_direction: ['', Validators.required]
    });
    this.typedocuments(this.users?.dataSociete?.uid, '');
  }

  submitForm(): void {
    this.errorTexte = ''

    if (this.societeDirection.valid) {
      this.isLoad = true;
      this.societeDirection.value.action = this.societeDirection.value.action ? this.societeDirection.value.action : 1;
      this.societeDirection.value.idsociete = this.societeDirection.value.idsociete ? this.societeDirection.value.idsociete : this.users?.dataSociete?.uid
      console.log(this.societeDirection.value)
      this.httService.postData(`${environment.api_url}auth/:savedirection`, this.societeDirection.value, this.users?.access_token)
          .toPromise()
          .then((res: any) => {
            this.isLoad = false;
            window.scrollTo({top: 0, behavior: 'smooth'});
            if (res.body.status) {
              this.societeDirection.reset({});
              this.typedocuments(this.users?.dataSociete?.uid, '');
              this.toast.success(`${res.body.message}`, '',
                  {
                    positionClass: 'toast-top-right',
                    closeButton: true,
                    timeOut: 3000
                  })
            }
          })
          .catch((err) => {
            this.isLoad = false;
            console.log(err?.error)
            this.toast.error(`${err?.error?.err?.message || 'Une erreur est survenue.'} `, '',
                {
                  positionClass: 'toast-top-right',
                  closeButton: true,
                  timeOut: 3000
                })
            setTimeout(() => {
              this.errorTexte = `${err?.error?.err?.message || 'Une erreur est survenue.'} `;
            }, 3000)
          });
    } else {
      Object.values(this.societeDirection.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  resetForm(): void {
    this.errorTexte = '';
    this.societeDirection.reset({});
  }

  typedocuments(idsociete: string = '', idtypedocuments: string = '') {
    this.isloading = true;
    this.dataTypeDocument = [];
    this.httService.getData(`${environment.api_url}api/:savetypedocuments?idsociete=${idsociete}`, false, this.users?.access_token || '')
        .toPromise()
        .then((res: any) => {
          this.isloading = false;
          if (res.body.status) {
            this.dataTypeDocument = res.body.data;
            console.log(res.body.data)
          }
        })
        .catch((err) => {
          this.isloading = false;
        });

  }

  actionBtn(data: any) {
    this.errorTexte = ''
    let payload = {
      action: 2,
      iddirection: data.uid,
      idsociete: data.datasociete.uid,
      sigle_direction: data.sigle_direction,
      libelle_direction: data.libelle_direction
    }
    console.log(data)
    this.societeDirection.setValue(payload);
  }
}
