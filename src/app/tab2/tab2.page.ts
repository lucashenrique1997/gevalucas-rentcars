import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BackendService} from "../services/backend.service";
import {OverlayService} from "../../services/overlay.service";
import {Rent} from "../models/Rent";

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

  pickUpVehicle() {
    this.backendService.deliverCar(this.form.value.id, this.form.value.notes).subscribe(() => {
      console.log('delivered');
    });
  }

  async search() {
    const loading = await this.overlayService.loading();
    this.backendService.getRent(this.form.value.id).subscribe(async (rent: Rent) => {
      if (!rent) {
        await this.overlayService.toast({
          message: 'Reserva não encontrada.'
        });
      } else {
        this.hasInfo = true;
      }
      await loading.dismiss();
    });
  }

}
