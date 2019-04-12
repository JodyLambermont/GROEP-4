import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: "./tabs/tabs.module#TabsPageModule"
  },
  {
    path: "profile",
    loadChildren: "./profile/profile.module#ProfilePageModule"
  },
  {
    path: "admin",
    loadChildren: "./admin/admin.module#AdminPageModule"
  },
  {
    path: "settings",
    loadChildren: "./settings/settings.module#SettingsPageModule"
  },
  { path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },
  {
    path: "reset-password",
    loadChildren:
      "./pages/reset-password/reset-password.module#ResetPasswordPageModule"
  },
  {
    path: "signup",
    loadChildren: "./pages/signup/signup.module#SignupPageModule"
  },
  {
    path: "task-entry",
    loadChildren: "./pages/task-entry/task-entry.module#TaskEntryPageModule"
  },
  {
    path: "calendar",
    loadChildren: "./pages/calendar/calendar.module#CalendarPageModule"
  },
  {
    path: "change-name",
    loadChildren: "./settings/change-name/change-name.module#ChangeNamePageModule"
  },
  { 
    path: 'change-password', 
    loadChildren: './settings/change-password/change-password.module#ChangePasswordPageModule' 
  },
  { 
    path: 'change-workweek', 
    loadChildren: './settings/change-workweek/change-workweek.module#ChangeWorkweekPageModule' 
  },
  { 
    path: 'change-notifications', 
    loadChildren: './settings/change-notifications/change-notifications.module#ChangeNotificationsPageModule' 
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
