import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BackendService} from "../services/backend.service";
import {Category} from "../models/Category";
import {Car} from "../models/Car";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public form: FormGroup;

  //todo use this in the select
  private categories: Category[];
  private cars: Car[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService,
  ) {
  }

  ngOnInit() {
    this.buildForm();
    this.backendService.listCategories().subscribe((categories) => {
      console.log(categories);
      this.categories = categories;
    })
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

  updateCarsList() {
    this.backendService.listCarsByCategory(this.form.value.category).subscribe((cars) => {
      console.log(cars);
      this.cars = cars;
    })
  }

  bookVehicle() {
    //todo get userId correctly
    this.backendService.createRent(this.form.value.car, 1, this.form.value.outDate, this.form.value.returnDate).subscribe((result: number) => console.log(result));
  }

}
