import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'new-user', loadChildren: './new-user/new-user.module#NewUserPageModule' },
  { path: 'dog-details/:id', loadChildren: './dog-details/dog-details.module#DogDetailsPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
