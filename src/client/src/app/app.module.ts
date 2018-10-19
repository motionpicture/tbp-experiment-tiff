/**
 * NgModule
 */

// tslint:disable:no-submodule-imports max-line-length
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './components/app/app.component';
import { BaseComponent } from './components/pages/base/base.component';
import { DetailComponent } from './components/pages/detail/detail.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { FidoRegisterComponent } from './components/pages/fido/fido-register/fido-register.component';
import { FidoRemoveComponent } from './components/pages/fido/fido-remove/fido-remove.component';
import { ListComponent } from './components/pages/list/list.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { AlertModalComponent } from './components/parts/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './components/parts/confirm-modal/confirm-modal.component';
import { ContentsComponent } from './components/parts/contents/contents.component';
import { FooterComponent } from './components/parts/footer/footer.component';
import { HeaderComponent } from './components/parts/header/header.component';
import { LoadingComponent } from './components/parts/loading/loading.component';

import {
    AppRoutingModule,
    StoreModule
} from './modules';
import { CoreStoreModule } from './store/core/store';

// tslint:disable-next-line:no-stateless-class
@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        ContentsComponent,
        HeaderComponent,
        FooterComponent,
        AlertModalComponent,
        LoadingComponent,
        ErrorComponent,
        BaseComponent,
        ConfirmModalComponent,
        FidoRegisterComponent,
        FidoRemoveComponent,
        ListComponent,
        DetailComponent
    ],
    entryComponents: [
        AlertModalComponent,
        ConfirmModalComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        StoreModule,
        CoreStoreModule,
        NgbModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
