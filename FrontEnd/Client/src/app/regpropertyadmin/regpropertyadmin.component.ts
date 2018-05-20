import { Component, OnInit } from '@angular/core';
import { PropertyOwnerService } from '../services/property-owner.service';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UsernameValidators } from '../common/validators/username.validators';
import { CommonValidators } from '../common/validators/common.validators';

@Component({
  selector: 'app-regpropertyadmin',
  templateUrl: './regpropertyadmin.component.html',
  styleUrls: ['./regpropertyadmin.component.scss']
})
export class RegpropertyadminComponent implements OnInit {

  test : Date = new Date();
  form : FormGroup = null;
  fileToUpload: File = null;
  image_url : string = './assets/img/default-avatar.png';
  // image_url : string = '../Pictures/images.png';
  pending = false;

  constructor(private formBuilder : FormBuilder, private service : PropertyOwnerService) {
    this.form =  formBuilder.group({
      property_owner_name : ['', Validators.pattern('([A-Za-z]+[.]?[\\s]*?)+[A-Za-z][\\\']?([A-Za-z]*?[\\s]*?)*?')],
      address_postal_code : [],
      address_street_and_num : [],
      address_city : [],
      address_country : [],
      fax : [],
      email : ['', Validators.email],
      registerd_date : [''],
      username : ['', Validators.pattern('[A-z][A-z0-9_]{5,15}')],
      password : ['', Validators.pattern('([A-Za-z]{1,1}[A-Za-z0-9_]*?){6,15}')]
    });
  }

  next(){
    this.register_property_owner();
    // this.form.setErrors({
    //   invalidLogin : true
    // });
  }

  ngOnInit() {}

  fileuploaderOnChange(event, url) {
    this.fileToUpload = event.target.files[0];

    // let reader = new FileReader();
    // reader.readAsDataURL(this.fileToUpload);
    // reader.onload = (event) => {
      //this.image_url = event.target.result;
	  // this.image_url = this.sanitization.bypassSecurityTrustStyle(event.target.result);
    // }
  }

  register_property_owner () {
    let formdata = new FormData();
    for (let row in this.form.getRawValue()){
      let x : string = this.form.get(row).value;
      formdata.append(row, x);
    }
    formdata.append('profile_picture', this.fileToUpload, this.fileToUpload !== null ? this.fileToUpload.name : null);

    // this.pending = true;
    // console.log('pending...' + this.pending);
    this.service.insert('insert_Property_Owner', formdata )
    .subscribe(
      responce => {
        console.log(responce);
      },
      (error : AppError) => {
        if(error instanceof BadInput){
          alert ('This post input data has error..');
        } else throw error;
      });
    // this.pending = false;
    // console.log('pended...' + this.pending);
  }

  get property_owner_name(){
    return this.form.get('property_owner_name');
  }

  get email(){
    return this.form.get('email');
  }






















  getAll (){
    this.service.getAll('get_Property_Owner')
      .subscribe(responce => {
        console.log(responce);
      });
  }

  search () {
    let property_owner_id =26;

    // let headers = new Headers({});
    // let myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');
    // let myParams = new HttpParams();
    // myParams.append(' search_Property_Owner_id ', property_owner_id);
    // let options : RequestOptions = new RequestOptions({ headers: myHeaders, params: myParams });

    // this.service.search('search_Property_Owner' , { params: new HttpParams({ search_Property_Owner_id : property_owner_id }) } )
    // this.service.search('search_Property_Owner' , { params: {'search_Property_Owner_id': id} } )
    this.service.search('search_Property_Owner?property_owner_id=' + property_owner_id )
      .subscribe(
        responce => {
          console.log(responce);
        });
  }

  update (){
    let values : Property_Owner = {property_owner_id : 0, property_owner_name : 'property_owner_name04', address_postal_code : 'address_postal_code04', address_street_and_num : 'address_street_and_num04', address_city : 'address_city04', address_country : 'address_country04', fax : 'fax04', email : 'email04', registerd_date : '2017.1.04', profile_picture : 'profile_picture04', username : 'username04', password : 'password04'};

    // this.service.update('update_Property_Owner', values)
    //   .subscribe(
    //     responce => {
    //       console.log(responce);
    //     });

    console.log (this.service.update('update_Property_Owner', values));

  }

  delete () {
    let property_owner_id = 23;

    this.service.delete('delete_Property_Owner?property_owner_id=' + property_owner_id)
      .subscribe(
        (error : AppError) => {
          if(error instanceof NotFoundError)
            alert ('This post has already deleted..');
          else throw error;
        });
  }

}



export interface Property_Owner {

  property_owner_id : number;
  property_owner_name : string;
  address_postal_code : string;
  address_street_and_num : string;
  address_city : string;
  address_country : string;
  fax : string;
  email : string;
  registerd_date : string;
  profile_picture : string;
  username : string;
  password : string;

}
