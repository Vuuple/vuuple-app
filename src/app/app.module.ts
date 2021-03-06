import { ErrorInterceptorService } from './providers/http-provider/error-interceptor.service';
import { JwtInterceptorService } from './providers/http-provider/jwt-interceptor.service';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
// import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/core/auth.guard';
import { AuthModule } from './auth/auth.module';
import { UploadFileService } from './providers/uploadFile/upload-file.service';
 
import { DataService } from './providers/http-provider/data.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, WebviewDirective],//, HomeComponent
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,      
    NgxSpinnerModule,
    AuthModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() ,// ToastrModule added
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    ElectronService,
    DataService,
    AuthGuard,
    UploadFileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
