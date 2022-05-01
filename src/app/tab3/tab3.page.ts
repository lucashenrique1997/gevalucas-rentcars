import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BackendService} from "../services/backend.service";
import {OverlayService} from "../../services/overlay.service";

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

  returnVehicle() {
    this.backendService.receiveCar(this.form.value.id, this.form.value.notes).subscribe(() => {
      console.log('received');
    });
  }

  async search() {
    const loading = await this.overlayService.loading();
    try {
      this.hasInfo = true;
    } catch (e) {
      await this.overlayService.toast({
        message: 'Reserva não encontrada.'
      });
    } finally {
      await loading.dismiss();
    }  }

}
