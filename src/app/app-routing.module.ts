import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { ResolveService } from '../app/services/consultantAPI/resolve.service'

//Every route (but login) can activate the authentication guard
//Access is only granted once a user has a valid jwt token and which is not expired
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
  {
    path: "login",
    loadChildren: "./pages/login/login.module#LoginPageModule"
  },
  {
    path: "reset-password",
    loadChildren:
      "./pages/reset-password/reset-password.module#ResetPasswordPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "signup",
    loadChildren: "./pages/signup/signup.module#SignupPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "calendar",
    loadChildren: "./pages/calendar/calendar.module#CalendarPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "change-name",
    loadChildren:
      "./settings/change-name/change-name.module#ChangeNamePageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "change-password",
    loadChildren:
      "./settings/change-password/change-password.module#ChangePasswordPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "change-workweek",
    loadChildren:
      "./settings/change-workweek/change-workweek.module#ChangeWorkweekPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "change-notifications",
    loadChildren:
      "./settings/change-notifications/change-notifications.module#ChangeNotificationsPageModule",
    canActivate: [AuthGuard]
  },
  { path: 'consultants', loadChildren: './pages/consultants/consultants.module#ConsultantsPageModule' },
  { 
    path: 'consultantdetail/:id', 
    resolve: { 
      special: ResolveService
    },
    loadChildren: './pages/consultantdetail/consultantdetail.module#ConsultantdetailPageModule', canActivate: [AuthGuard] },
  { path: 'projects', loadChildren: './pages/projects/projects.module#ProjectsPageModule', canActivate: [AuthGuard] },
  { path: 'add-project', loadChildren: './pages/add-project/add-project.module#AddProjectPageModule', canActivate: [AuthGuard] },
  { path: 'change-project/:id', loadChildren: './pages/change-project/change-project.module#ChangeProjectPageModule', canActivate: [AuthGuard] },
  { path: 'add-user-to-project', loadChildren: './pages/projects/add-user-to-project/add-user-to-project.module#AddUserToProjectPageModule', canActivate: [AuthGuard] },
  { path: 'projectdetail/:id', loadChildren: './pages/projectdetail/projectdetail.module#ProjectdetailPageModule', canActivate: [AuthGuard] },
  { path: 'remove-user-from-project', loadChildren: './pages/projects/remove-user-from-project/remove-user-from-project.module#RemoveUserFromProjectPageModule', canActivate: [AuthGuard] }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
