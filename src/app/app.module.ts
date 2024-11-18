import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
