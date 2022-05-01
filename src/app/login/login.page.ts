import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BackendService} from "../services/backend.service";
import {User} from "../models/User";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    public router: Router
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
    this.backendService.login(this.form.value.user, this.form.value.password).subscribe(async (value: User) => {
      console.log(value);
      await this.router.navigateByUrl('/', { state: value });
    });
  }

}
