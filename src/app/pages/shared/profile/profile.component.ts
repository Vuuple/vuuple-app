import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { UploadService } from '../../../providers/upload/upload.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ServerApiService]
})
export class ProfileComponent implements OnInit {
  username: any;
  email: any;
  ethaddress: any;
  category: any;
  status: any;
  port: any;
  ip: any;
  enode: any;
  id: any;
  node;
  currentUser;
  file: string | ArrayBuffer;
  hashFile: any;
  selectedFiles: FileList;
  Image: any;
  constructor(
    private serverApiService: ServerApiService,
    private authservics: AuthService,
    private router: Router,
    private route: ActivatedRoute ,
    private UploadService : UploadService ,
    private tostr : ToastrService
  ) {
    // check query param 'id' if it's null , get the current user profile , if not get the user profile from the id passed through the queryparam
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id, ' this.id');

      if (this.id != undefined && this.id != null) {
        this.serverApiService.getUser(this.id).subscribe(data => {
          console.log(data);
          this.node = data;
          this.currentUser = this.authservics.currentUser;

          console.log(this.node, '  if this.node');
        });
      } else {
        this.node = this.authservics.currentUser;
      }
    });
  }
  async getImage(){
    return !this.node.image ? this.Image = "assets/img/vuupleIcone.png" : this.Image = `https://s3.amazonaws.com/vuuple.com/images/${this.node.image}`;

  }

  reportIssue() {
    this.router.navigate(['/pages/report']);
  }
  async upload() {
    const file = this.selectedFiles.item(0);
    const image = await this.UploadService.uploadFile(file);
    this.Image = `https://s3.amazonaws.com/vuuple.com/images/${image}`;
    this.updateLocalStorage(image);

  }
  updateLocalStorage(image){

    const user = JSON.parse(localStorage.getItem('user'));
    user.image = image;
    localStorage.setItem('user', JSON.stringify(user));
  }

  onFileChange(e) {
    this.selectedFiles = e.target.files;
    this.upload();
  }

  ngOnInit() {
    console.log(this.getImage());

  }
}
