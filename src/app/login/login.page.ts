import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
        user: [''],
        password: [''],
      }
    );
  }

  login() {
    console.log('oi');
  }

}
