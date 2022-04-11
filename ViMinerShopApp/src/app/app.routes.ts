import { NotFoundComponent } from './not-found/not-found.component';
import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  { path: 'not-found', component: NotFoundComponent, data: { message: 'Page not found!' } },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'info', loadChildren: () => import('./general-docs/general-docs.module').then(m => m.GeneralDocsModule) },
  { path: '**', redirectTo: '/not-found' }
];

