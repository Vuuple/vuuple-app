import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import * as sha256 from 'sha256' ;
import { ServerApiService } from '../server-api/server-api.service';
import { ToastrService } from 'ngx-toastr';

const s3bucket = require('../../../aws.json');
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  
  
  constructor( private serverApiService : ServerApiService ,
               private tostr : ToastrService ) { }

  async uploadFile(file) {

  const bucket = new S3(
    {
      accessKeyId: s3bucket.Access_key_ID,
      secretAccessKey: s3bucket.Secret_access_key,
      region: 'us-east-1'
    }
  );
  const fileName = file.name ;

  const newFileName = sha256(fileName) ;

  const params = {
    Bucket: 'vuuple.com',
    Key: 'images/' + newFileName ,
    Body: file
  };
 
 const loading = await bucket.upload(params, function (err, data) {
    if (err) {
      console.log('There was an error uploading your file: ', err);
      return false;
    }
    console.log('Successfully uploaded file.', data);  
    return true;
  });  
  console.log(loading)
  if(loading){
    const data = {
      "image" : newFileName 
    }
    this.serverApiService.updateImage(data).subscribe(
      res => {
        console.log(res) ;
        window.location.reload();
    })
     err => {
      this.tostr.error("something went wrong") ;
      console.log(err)
    }
  }
}

}