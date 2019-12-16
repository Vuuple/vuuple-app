import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerApiService } from '../../../providers/server-api/server-api.service';

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
  constructor(
    private serverApiService: ServerApiService,
    private authservics: AuthService,
    private router: Router,
    private route: ActivatedRoute
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
  reportIssue() {
    this.router.navigate(['/pages/report']);
  }

  onFileChange(e){
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
         this.file = reader.result ;
    }
  }
  ngOnInit() {}
}
