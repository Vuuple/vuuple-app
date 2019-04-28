import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {} from '@angular/forms/src/model';
import { AuthService } from '../../../auth/core/auth.service';
const networkPath = require('electron').remote.getGlobal('networkPath');
const path = require('path');
const fs = require('fs');
const replace = require('replace-in-file');
@Component({
  selector: 'app-raft-manage',
  templateUrl: './raft-manage.component.html',
  styleUrls: ['./raft-manage.component.scss']
})
export class RaftManageComponent implements OnInit {
  myForm: FormGroup;
  node;
  constructor(private fb: FormBuilder, public authService: AuthService) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      raftId: ['', [Validators.required]]
    });
    this.node = this.authService.getCuurentUser();

    if (this.node != undefined && this.node != null) {
      console.log(this.node, 'this.node');

      this.myForm.patchValue({ raftId: this.node.raftId, disabled: true });
      console.log(this.myForm.value, 'form values');
    }
  }
  async editRaftId() {
    // const id = this.myForm.value.raftId;

    console.log(this.myForm.value.raftId, 'this.myForm.value.raftId');
    console.log(networkPath, 'networkPath');
    // to avoid errors we first replace the old file and then search and replace to add the raft id
    const input = path.join(networkPath, '/raft-start-template.sh');
    const output = path.join(
      networkPath,
      'examples/',
      '/7nodes',
      '/raft-start.sh'
    );
    fs.copyFile(input, output, err => {
      if (err) throw err;
      console.log('source.txt was copied to destination.txt');
    });

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
      to: '--raftjoinexisting ' + this.myForm.value.raftId
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
