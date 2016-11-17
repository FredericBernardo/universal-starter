import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarComponent } from './event.component';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [CalendarComponent],
  bootstrap: [CalendarComponent],
  exports: [
    CalendarComponent
  ]

})

export class EventModule {
}
