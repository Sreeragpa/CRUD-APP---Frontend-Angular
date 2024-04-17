import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { userReducer } from './Store/user.reducers';
import {
  StoreDevtoolsModule,
  provideStoreDevtools,
} from '@ngrx/store-devtools';
import { UserEffects } from './Store/user.effects';
import { provideEffects } from '@ngrx/effects';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment.development';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore({
      user: userReducer,
    }),
    provideEffects(UserEffects),
    provideState({ name: 'user', reducer: userReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),

    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebaseConfig))),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  ],
  
};
