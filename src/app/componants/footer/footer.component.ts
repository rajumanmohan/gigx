import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from './../../Services/data-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  constructor(public router: Router, public dataStorage: DataStorageService, private formBuilder: FormBuilder) { }
  subscribeFrom: FormGroup;
  submitEmail = false;
  get sub() { return this.subscribeFrom.controls }

  ngOnInit() {
    window.scroll(0, 0);
    this.subscribeFrom = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  submitsubscribe() {
    this.submitEmail = true;
    if (this.subscribeFrom.invalid) {
      return;
    } else {
      this.router.navigate(['/createaccount']);
    }
    }

}
 