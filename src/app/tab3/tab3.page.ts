import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
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

  returnVehicle() {
    console.log(this.form.getRawValue());
  }

  search() {
    this.hasInfo = true;
  }

}
