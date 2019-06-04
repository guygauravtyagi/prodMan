import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { FactoryPage } from '../pages/factory/factory';
import { DetailsPage } from '../pages/details/details';
import { LinePage } from '../pages/line/line';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommonProvider } from '../providers/common/common';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FactoryPage,
    DetailsPage,
    LinePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FactoryPage,
    DetailsPage,
    LinePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonProvider
  ]
})
export class AppModule {}
