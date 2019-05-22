import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {} from '@angular/forms/src/model';
import { AuthService } from '../../../auth/core/auth.service';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
const networkPath = require('electron').remote.getGlobal('networkPath');
const path = require('path');
const fs = require('fs');
const replace = require('replace-in-file');

import { alter_staticNodes } from '../../../../assets/js/helpers/alter.js';
@Component({
  selector: 'app-raft-manage',
  templateUrl: './raft-manage.component.html',
  styleUrls: ['./raft-manage.component.scss']
})
export class RaftManageComponent implements OnInit {
  myForm: FormGroup;
  node;
  staticNodes = [];
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private apiService: ServerApiService
  ) {
    this.apiService.getStaticNodes().subscribe(s => {
      this.staticNodes = [];
      s.forEach(item => {
        //console.log(item, 'b 4 item');
        item = JSON.parse(item);
        // item.toString().replace('/\"', '');
        // console.log(item, 'item');
        this.staticNodes.push(item);
      });
      // console.log(s, 'static nodes');

      this.readPermissionNodeFile();
    });
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      raftId: ['', [Validators.required]]
    });
    this.node = this.authService.getCuurentUser();

    if (this.node != undefined && this.node != null) {
      console.log(this.node, 'this.node');

      this.myForm.patchValue({ raftId: this.node.raftId });
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
      this.myForm.patchValue({ raftId: null });
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
        // this.myForm.value.raftId = null;
        // update static nodes file
      })
      .catch(error => {
        console.error('Error occurred:', error);
      });
    // const result = await alter.alter_script(id, input, output);
    // console.log(result, 'result');
  }

  writePermissionedNode() {
    //  "enode://ac6b1096ca56b9f6d004b779ae3728bf83f8e22453404cc3cef16a3d9b96608bc67c4b30db88e0a5a6c6390213f7acbe1153ff6d23ce57380104288ae19373ef@3.14.2.131:21000?discport=0&raftport=50400",
  }
  readPermissionNodeFile() {
    const input = path.join(networkPath, '/permissioned-nodes.json');
    const output = path.join(
      networkPath,
      'examples/',
      '/7nodes',
      '/permissioned-nodes.json'
    );
    console.log(this.staticNodes, 'this.staticNodes');

    alter_staticNodes(this.staticNodes, input, output);
  }
}
