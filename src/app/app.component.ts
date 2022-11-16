import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher, MatRipple } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';
import { MatStepperIntl } from '@angular/material/stepper';
import { DomSanitizer } from '@angular/platform-browser';
import { debounceTime, map, Observable } from 'rxjs';
export class TwStepperIntl extends MatStepperIntl {
  override optionalLabel = '非必填';
}
export class EarlyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && control.dirty);
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: MatStepperIntl, useClass: TwStepperIntl }],
})
export class AppComponent implements OnInit {
  title = 'app';

  isLinear: boolean = true;
  surveyForm: FormGroup;
  earlyErrorStateMacher = new EarlyErrorStateMatcher();
  countries$: Observable<any[]>;

  // formatAlignGroup: any;
  // buttonToggleBold: any;
  // buttonToggleItalic: any;
  // buttonToggleUnderlined: any;
  @ViewChild(MatRipple) ripple: MatRipple;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private httpClient: HttpClient
  ) {
    this.matIconRegistry.addSvgIconInNamespace(
      'custom-svg',
      'thumbs-up',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/angular_solidBlack.svg'
      )
    );
    this.matIconRegistry.addSvgIconInNamespace(
      'custom-svg',
      'angular',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/angular_solidBlack.svg'
      )
    );
    console.log('constructor');

    this.matIconRegistry.registerFontClassAlias('fontawesome', 'fa');

    this.surveyForm = new FormGroup({
      basicQuestions: new FormGroup({
        name: new FormControl('', Validators.required),
        intro: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
        ]),
        country: new FormControl(''),
        majorTech: new FormControl(''),
      }),
    });
  }

  ngOnInit() {
    console.log('init');
    this.surveyForm
      .get('basicQuestions')
      .get('country')
      .valueChanges.pipe(debounceTime(300))
      .subscribe((inputCountry) => {
        this.countries$ = this.httpClient
          .get<any[]>('assets/countries.json')
          .pipe(
            map((countries) => {
              return countries.filter(
                (country) => country.name.indexOf(inputCountry) >= 0
              );
            })
          );
      });
  }
  triggerRipple() {
    const point1 = this.ripple.launch(0, 0, {
      color: 'pink',
      centered: true,
      persistent: true,
      radius: 50,
    });
    const point2 = this.ripple.launch(0, 0, {
      color: 'yellow',
      centered: true,
      persistent: true,
      radius: 20,
    });

    setTimeout(() => {
      point1.fadeOut();
    }, 500);
  }

  clearRipple() {
    this.ripple.fadeOutAll();
  }

  ngAfterViewInit(): void {
    // this.ripple.launch(0, 0);
    // console.log('ngAfterViewInit');
  }

  toggleSideNav(sideNav: MatSidenav) {
    sideNav.toggle().then((result: MatDrawerToggleResult) => {
      console.log('result');
      console.log(result);
      console.log(`選單狀態：${result}`);
    });
  }
  opened() {
    console.log('芝麻開門');
  }

  closed() {
    console.log('芝麻關門');
  }
}
