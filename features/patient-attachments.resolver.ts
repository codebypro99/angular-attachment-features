import { ResolveFn } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetPatientAttachments } from '../store/patient-attachments/patient-attachments.actions';

export const patientAttachmentsResolver: ResolveFn<Observable<void> | Promise<void>> = (route, state, store = inject(Store)) => {
  const actions = [];
  if (route?.params?.id) {
    actions.push(new GetPatientAttachments(route?.params?.id));
  }
  return store.selectOnce(stateStore => stateStore).pipe(switchMap(() => store.dispatch(actions)));
};
