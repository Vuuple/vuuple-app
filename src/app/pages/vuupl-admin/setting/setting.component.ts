import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  EditForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  createForm() {
    this.EditForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {}
  get f() {
    return this.EditForm.controls;
  }
  EditFunction() {
    this.submitted = true;

    if (this.EditForm.invalid) {
      return;
    }
  }
}
