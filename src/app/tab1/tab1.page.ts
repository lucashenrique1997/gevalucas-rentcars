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

  //todo use this in the select
  private categories: Category[];
  private cars: Car[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private overlayService: OverlayService
  ) {
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
    //todo get userId correctly
    const loading = await this.overlayService.loading();
    try {
      this.backendService.createRent(this.form.value.car, 1, this.form.value.outDate, this.form.value.returnDate)
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
