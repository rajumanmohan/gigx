import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrls: ['./getstarted.component.scss']
})
export class GetstartedComponent implements OnInit {
  getStartForm: FormGroup;
  submit = false;

  // routerLink="/talentregistration"
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getStartForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  get f() { return this.getStartForm.controls; }
  start() {
    this.submit = true;
    if (this.getStartForm.invalid) {
      return;
    } else {
      this.router.navigate(['/talentregistration']);
    }
  }
}
