import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { QrCodeGeneratorComponent } from './shared/qr-code-generator/qr-code-generator.component';
import { QrCodeScannerComponent } from './shared/qr-code-scanner/qr-code-scanner.component';

const appRoutes: Routes = [
  { path: 'scanner', component: QrCodeScannerComponent },
  { path: 'generator', component: QrCodeGeneratorComponent },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import('./features/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./features/checkout/checkout.module').then(m => m.CheckoutModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'thank-you',
    loadChildren: () => import('./features/thank-you/thank-you.module').then(m => m.ThankYouModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard]
  },
  
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
