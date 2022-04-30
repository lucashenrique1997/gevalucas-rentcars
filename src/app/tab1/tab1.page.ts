import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
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
        outDate: [''],
        returnDate: [''],
        category: [''],
        car: ['']
      }
    );
    //console.log(this.form);
  }

  bookVehicle() {
    console.log(this.form.getRawValue());
    console.log('reservation');
  }

}
