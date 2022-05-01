import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BackendService} from '../services/backend.service';
import {User} from '../models/User';
import {Router} from '@angular/router';
import {OverlayService} from '../../services/overlay.service';


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
    public router: Router,
    private overlayService: OverlayService,
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

  async login() {
    const loading = await this.overlayService.loading();
    try {
      this.backendService.login(this.form.value.user, this.form.value.password).subscribe(async (value: User) => {
        console.log('value => ', value);
        window.localStorage.setItem('isOp', value.isOp ? 'true' : 'false');
        window.localStorage.setItem('userId', value.id.toString());
        const url = value.isOp ? '/tabs/tab2' : '/tabs/tab1';
        console.log('url === ', url);
        await this.router.navigateByUrl(url, {state: value});
      });
    } catch (e) {
      await this.overlayService.toast({
        message: 'Erro ao efetuar login.'
      });
    } finally {
      await loading.dismiss();
    }
  }

}
