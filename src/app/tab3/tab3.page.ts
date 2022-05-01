import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BackendService} from '../services/backend.service';
import {OverlayService} from '../../services/overlay.service';
import {Rent} from '../models/Rent';
import * as moment from 'moment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public form: FormGroup;
  hasInfo = false;
  private rent: Rent;

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private overlayService: OverlayService
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

  async returnVehicle() {
    const loading = await this.overlayService.loading();
    try {
      this.backendService.receiveCar(this.form.value.id, this.form.value.notes).subscribe(async () => {
        await this.overlayService.toast({
          message: 'Devolução realizada com sucesso!.'
        });
      });
    } catch (e) {
      await this.overlayService.toast({
        message: 'Erro ao realizar a devolução.'
      });
    } finally {
      await loading.dismiss();

    }
  }

  async search() {
    const loading = await this.overlayService.loading();
    this.backendService.getRent(this.form.value.id).subscribe(async (rent: Rent) => {
      if (!rent) {
        await this.overlayService.toast({
          message: 'Reserva não encontrada.'
        });
      } else {
        this.rent = rent;
        if (this.rent.realInitialRent)
          this.rent.realInitialRent = moment(this.rent.realInitialRent).format('DD/MM/YYYY');

        if (this.rent.endRent)
          this.rent.endRent = moment(this.rent.endRent).format('DD/MM/YYYY');
        this.hasInfo = true;
      }
      await loading.dismiss();
    }, async error => {
      console.log(error);
      await this.overlayService.toast({
        message: 'Reserva não encontrada.'
      });
      await loading.dismiss();
    });
  }

}
