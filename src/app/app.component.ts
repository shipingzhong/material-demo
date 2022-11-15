import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRipple } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLinear: boolean;
  basicFormGroup: FormGroup;
  title = 'app';
  // formatAlignGroup: any;
  // buttonToggleBold: any;
  // buttonToggleItalic: any;
  // buttonToggleUnderlined: any;
  @ViewChild(MatRipple) ripple: MatRipple;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
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

    this.basicFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    console.log('init');
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
    this.ripple.launch(0, 0);
    console.log('ngAfterViewInit');
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
