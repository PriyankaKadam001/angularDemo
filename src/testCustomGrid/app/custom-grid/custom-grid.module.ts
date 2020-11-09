import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomGridComponent } from './custom-grid.component';
import { PrimeTemplate } from './directives/template-type.directive';
import { CustomTableBody } from './directives/template-row.diretive';
import { xRowToggler } from './directives/row-toggle.directive';


@NgModule({
  declarations: [CustomGridComponent, PrimeTemplate, CustomTableBody, xRowToggler],
  imports: [
    CommonModule
  ],
  exports:[CustomGridComponent,PrimeTemplate,CustomTableBody, xRowToggler]
})
export class CustomGridModule { }
