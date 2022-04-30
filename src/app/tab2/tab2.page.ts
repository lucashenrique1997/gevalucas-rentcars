import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

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
    console.log(this.form.getRawValue());
  }

  search() {
    this.hasInfo = true;
  }

}
