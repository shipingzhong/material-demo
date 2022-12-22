import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {
  MatRippleModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';

export const TW_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'YYYY/MM/DD',
    monthYearA11yLabel: 'YYYY MMM',
  },
};
@NgModule({
  imports: [], // 先import
  exports: [
    CommonModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonToggleModule,
    MatRippleModule,
    MatSidenavModule,
    MatMenuModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
  ], // 在export
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },
    { provide: MAT_DATE_FORMATS, useValue: TW_FORMATS },
  ],
})
export class SharedMaterialModule {}
