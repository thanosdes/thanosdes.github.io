import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { Routes, provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TeamResultsComponent } from './app/features/team-results/team-results.component';
import { MainComponent } from './app/components/main/main.component';
import { LeaguesComponent } from './app/features/leagues/leagues.component';
import { headersInterceptor } from './app/shared/interceptors/headers-interceptor';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'leagues/:id', component: LeaguesComponent },
      { path: 'teams/:id', component: TeamResultsComponent },
    ],
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([headersInterceptor])),
    provideRouter(routes),
  ],
});
