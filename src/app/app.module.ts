import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';

@NgModule({
  declarations: [AppComponent, GraphComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgChartsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
