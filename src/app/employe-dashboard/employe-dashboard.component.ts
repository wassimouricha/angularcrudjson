import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { EmployeeModel } from './employe-dashboard.model';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-employe-dashboard',
  templateUrl: './employe-dashboard.component.html',
  styleUrls: ['./employe-dashboard.component.css']
})

export class EmployeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeModelObj: EmployeeModel = new EmployeeModel();
  employeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      prenom: [''],
      nom: [''],
      email: [''],
      telephone: [''],
      salaire: [''],

    })
    this.getAllEmploye();
  }
  cliclAddEmploye() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails() {
    this.employeModelObj.prenom = this.formValue.value.prenom;
    this.employeModelObj.nom = this.formValue.value.nom;
    this.employeModelObj.email = this.formValue.value.email;
    this.employeModelObj.telephone = this.formValue.value.telephone;
    this.employeModelObj.salaire = this.formValue.value.salaire;

    this.api.postEmploye(this.employeModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Employé ajouté avec succès")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmploye();

      },
        err => {
          alert("il y à eu une erreur")
        })
  }
  getAllEmploye() {
    this.api.getEmploye()
      .subscribe(res => {
        this.employeData = res;
      })
  }

  deleteEmploye(row: any) {
    this.api.deletetEmploye(row.id)
      .subscribe(res => {
        alert("Employé supprimé !");
        this.getAllEmploye();
      })
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeModelObj.id = row.id;
    this.formValue.controls['prenom'].setValue(row.prenom)
    this.formValue.controls['nom'].setValue(row.nom)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['telephone'].setValue(row.telephone)
    this.formValue.controls['salaire'].setValue(row.salaire)
  }
  updateEmployeeDetails() {
    this.employeModelObj.prenom = this.formValue.value.prenom;
    this.employeModelObj.nom = this.formValue.value.nom;
    this.employeModelObj.email = this.formValue.value.email;
    this.employeModelObj.telephone = this.formValue.value.telephone;
    this.employeModelObj.salaire = this.formValue.value.salaire;
    this.api.updateEmploye(this.employeModelObj, this.employeModelObj.id)
      .subscribe(res => {
        alert("mis a jour avec succès");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmploye();
      })
  }

}
