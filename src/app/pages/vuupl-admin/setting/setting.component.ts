import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
const alter = require('../../../../assets/js/helpers/alter.js');
const networkPath = require('electron').remote.getGlobal('networkPath');
const path = require('path');
const replace = require('replace-in-file');

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
  async editRaftId(id) {
    console.log(networkPath, 'networkPath');

    const input = path.join(networkPath, '/raft-start-template.sh');

    const output = path.join(
      networkPath,
      'examples/',
      '/7nodes',
      '/raft-start.sh'
    );
    const options = {
      //Single file
      files: output,

      //Multiple files
      // files: [
      //   'path/to/file',
      //   'path/to/other/file',
      // ],

      // //Glob(s)
      // files: [
      //   'path/to/files/*.html',
      //   'another/**/*.path',
      // ],

      //Replacement to make (string or regex)
      from: /--raftjoinexisting/g,
      to: '--raftjoinexisting ' + id
    };
    // console.log(input, 'input alter_script');
    // console.log(output, 'output alter_script');
    replace(options)
      .then(changedFiles => {
        console.log('Modified files:', changedFiles.join(', '));
      })
      .catch(error => {
        console.error('Error occurred:', error);
      });
    // const result = await alter.alter_script(id, input, output);
    // console.log(result, 'result');
  }
}
