import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { GridReusableComponent } from './grid-reusable/grid-reusable.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, CurrencyPipe } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ],
  declarations: [
      GridReusableComponent,
      CurrencyPipe
  ],
  providers: [
     
  ],
  bootstrap:[AppComponent]
})
export class AppModule { }