import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BackendService} from '../services/backend.service';
import {Category} from '../models/Category';
import {Car} from '../models/Car';
import {OverlayService} from '../../services/overlay.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public form: FormGroup;
  userId;

  //todo use this in the select
  private categories: Category[];
  private cars: Car[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private overlayService: OverlayService
  ) {
    this.userId = window.localStorage.getItem('userId');
  }

  ngOnInit() {
    this.buildForm();
    this.backendService.listCategories().subscribe((categories) => {
      console.log(categories);
      this.categories = categories;
    });
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
    });
  }

  async bookVehicle() {
    console.log('user id =', this.userId);
    const loading = await this.overlayService.loading();
    try {
      this.backendService.createRent(this.form.value.car, this.userId, this.form.value.outDate, this.form.value.returnDate)
        .subscribe(async (result: number) => {
          console.log(result);
          await this.overlayService.toast({
            message: 'Reserva Efetuada com Sucesso!'
          });
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
