/**
 * ルーティング
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FidoGuardService } from '../canActivates';
import { BaseComponent } from '../components/pages/base/base.component';
import { DetailComponent } from '../components/pages/detail/detail.component';
import { ErrorComponent } from '../components/pages/error/error.component';
import { ListComponent } from '../components/pages/list/list.component';
import { NotfoundComponent } from '../components/pages/notfound/notfound.component';
import * as fido from '../routes/fido.route';

const appRoutes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    fido.route,
    {
        path: '',
        component: BaseComponent,
        children: [
            { path: 'list', canActivate: [ FidoGuardService], component: ListComponent },
            { path: 'detail', canActivate: [ FidoGuardService], component: DetailComponent }
        ]
    },
    {
        path: '',
        component: BaseComponent,
        children: [
            { path: 'error', component: ErrorComponent },
            { path: '**', component: NotfoundComponent }
        ]
    }
];

// tslint:disable-next-line:no-stateless-class
@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { useHash: true, enableTracing: true }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
