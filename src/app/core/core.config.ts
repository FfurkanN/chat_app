import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';

export const coreConfig: ApplicationConfig = {
  providers: [provideHttpClient()],
};
