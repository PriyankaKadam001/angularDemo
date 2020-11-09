import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableBody } from './grid/grid-body.component';
import { CustomerService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { CustomGridModule } from './custom-grid/custom-grid.module';

@NgModule({
  declarations: [
    AppComponent,
    TableBody
  ],
  imports: [
    BrowserModule,
    CustomGridModule,
    HttpClientModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
