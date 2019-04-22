import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {send_email,upload} from '../../../../assets/js/helpers/mail.js'

@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.scss']
})
export class ReportIssueComponent implements OnInit {
  sendMailForm : FormGroup ;
  emailTo ="support@vuuple.com";
  data : [any] ;
  localUrl: any;
  attachName: any;
  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.sendMailForm = this.fb.group({
       title : [ '' , Validators.required ],
       description : [ '' , Validators.required ],
       email : [ '' , Validators.required],
       attachFile : ['']
    })
  }
  showPreviewFile(event: any) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
            this.localUrl = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    }
}
  sendEmail(){
   this.data=[{
      emailto : this.emailTo,
      from :this.sendMailForm.value.email,
      title : this.sendMailForm.value.title,
      des :this.sendMailForm.value.description,
      attachfile : this.localUrl,
    }];
    console.log(this.data);
    const mail =  send_email (this.emailTo,this.sendMailForm.value.email,this.sendMailForm.value.title,this.sendMailForm.value.description,this.localUrl);
    console.log(mail,'testmail')
  }
}
