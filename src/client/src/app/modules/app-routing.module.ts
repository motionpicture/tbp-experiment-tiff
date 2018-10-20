/**
 * ルーティング
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FidoGuardService } from '../canActivates';
import { BaseComponent } from '../components/pages/base/base.component';
import { DetailComponent } from '../components/pages/detail/detail.component';
import { ErrorComponent } from '../components/pages/error/error.component';
import { FidoRegisterComponent } from '../components/pages/fido/fido-register/fido-register.component';
import { FidoRemoveComponent } from '../components/pages/fido/fido-remove/fido-remove.component';
import { ListComponent } from '../components/pages/list/list.component';
import { NotfoundComponent } from '../components/pages/notfound/notfound.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    {
        path: 'fido',
        children: [
            {
                path: '',
                component: BaseComponent,
                children: [
                    { path: 'register', component: FidoRegisterComponent },
                    { path: 'remove', canActivate: [FidoGuardService], component: FidoRemoveComponent }
                ]
            }
        ]
    },
    {
        path: '',
        component: BaseComponent,
        canActivate: [FidoGuardService],
        children: [
            { path: 'list', canActivate: [FidoGuardService], component: ListComponent },
            { path: 'detail', canActivate: [FidoGuardService], component: DetailComponent }
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
