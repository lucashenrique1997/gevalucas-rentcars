import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BackendService} from "../services/backend.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public form: FormGroup;
  hasInfo = false;

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService
  ) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
        id: [''],
        notes: [''],
      }
    );
  }

  pickUpVehicle() {
    this.backendService.deliverCar(this.form.value.id, this.form.value.notes).subscribe(() => {
      console.log('delivered');
    });
  }

  search() {
    this.hasInfo = true;
  }

}
