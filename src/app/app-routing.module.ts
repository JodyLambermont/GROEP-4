import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./services/user/auth.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: "./tabs/tabs.module#TabsPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "profile",
    loadChildren: "./profile/profile.module#ProfilePageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "admin",
    loadChildren: "./admin/admin.module#AdminPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "settings",
    loadChildren: "./settings/settings.module#SettingsPageModule",
    canActivate: [AuthGuard]
  },
  { path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },
  {
    path: "profile",
    loadChildren: "./pages/profile/profile.module#ProfilePageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "reset-password",
    loadChildren:
      "./pages/reset-password/reset-password.module#ResetPasswordPageModule"
  },
  {
    path: "signup",
    loadChildren: "./pages/signup/signup.module#SignupPageModule"
  },
  { path: 'calendar', loadChildren: './pages/calendar/calendar.module#CalendarPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}