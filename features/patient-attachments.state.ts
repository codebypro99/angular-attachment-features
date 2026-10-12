import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { Observable } from 'rxjs';
import { FiltersKeyEnum } from '../../../../shared/enums/filtersKey.enum';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PatientsService } from '../../../../dashboard/services/patients.service';
import { removeEmptyObjectValues } from '../../../../shared/helpers/other';
import {
  DeletePatientAttachments,
  DownloadPatientAttachments,
  GetPatientAttachments,
  SentAttachmentsToHHAEx,
  UpdatePatientAttachmentsComment,
  UpdatePatientAttachmentsName,
} from './patient-attachments.actions';
import { openLink } from '../../../../shared/helpers/open-link';
import { PatientAttachmentsItem } from '../../../../shared/models/patient.models';

export interface PatientAttachmentModel {
  attachmentsList: PatientAttachmentsItem[];
  attachmentsTotal: number;
}

export const defaultState: PatientAttachmentModel = {
  attachmentsList: [],
  attachmentsTotal: 0,
};

@State({
  name: 'patientAttachments',
  defaults: defaultState,
})
@Injectable({
  providedIn: 'root',
})
export class PatientAttachmentsState {
  constructor(
    private service: PatientsService,
    private store: Store,
  ) {}

  @Selector()
  static attachmentsList(state: PatientAttachmentModel): PatientAttachmentsItem[] {
    return state.attachmentsList;
  }

  @Selector()
  static attachmentsTotal(state: PatientAttachmentModel): number {
    return state.attachmentsTotal;
  }

  getFilters(filtersValue: any): any {
    const { search, order, dir, page, perPage, dateTo, dateFrom, hhaExchange } = filtersValue;
    return removeEmptyObjectValues({
      page,
      perPage,
      order,
      dir,
      search,
      dateTo,
      dateFrom,
      hhaExchange: hhaExchange?.[0],
    });
  }

  @Action(GetPatientAttachments)
  getPatientExistingAttachmentsList(ctx: StateContext<PatientAttachmentModel>, { patientId }: GetPatientAttachments): Observable<any> {
    const filtersValue = this.store.selectSnapshot(({ filters }) => filters[FiltersKeyEnum.PatientAttachments].model);
    return this.service
      .getAttachments(patientId, {
        ...this.getFilters(filtersValue),
      })
      .pipe(
        tap(({ list, total }: any) => {
          ctx.patchState({
            attachmentsList: list,
            attachmentsTotal: total,
          });
        }),
      );
  }

  @Action(UpdatePatientAttachmentsName)
  updateExitingPatientAttachments(
    ctx: StateContext<PatientAttachmentModel>,
    { patientId, attachmentId, payload }: UpdatePatientAttachmentsName,
  ): Observable<any> {
    return this.service.updatePatientAttachment(patientId, attachmentId, payload);
  }

  @Action(UpdatePatientAttachmentsComment)
  updateExitingPatientAttachmentsComment(
    ctx: StateContext<PatientAttachmentModel>,
    { patientId, attachmentId, comment }: UpdatePatientAttachmentsComment,
  ): Observable<void> {
    return this.service.addPatientAttachmentComment(patientId, attachmentId, comment);
  }

  @Action(DownloadPatientAttachments)
  downloadPatientAttachments(ctx: StateContext<PatientAttachmentModel>, { patientId, attachmentId }: DownloadPatientAttachments): Observable<any> {
    return this.service.getPatientAttachmentLink(patientId, attachmentId).pipe(
      tap(({ link }: any) => {
        if (link) {
          openLink(link);
        }
      }),
    );
  }

  @Action(DeletePatientAttachments)
  deletePatientAttachments(ctx: StateContext<PatientAttachmentModel>, { patientId, attachmentId }: UpdatePatientAttachmentsComment): Observable<any> {
    return this.service.deletePatientAttachment(patientId, attachmentId);
  }

  @Action(SentAttachmentsToHHAEx)
  sentAttachmentsToHHAEx(ctx: StateContext<PatientAttachmentModel>, { patientId, attachmentId }: SentAttachmentsToHHAEx): Observable<any> {
    return this.service.syncAttachment(patientId, attachmentId);
  }
}
