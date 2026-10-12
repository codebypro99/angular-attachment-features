export class GetPatientAttachments {
  static readonly type = '[Patients attachments] Get Patient Attachments';

  constructor(public patientId: string) {}
}

export class UpdatePatientAttachmentsName {
  static readonly type = '[Patients attachments] Update patient Attachments name';

  constructor(
    public patientId: string,
    public attachmentId: string,
    public payload: { title: string },
  ) {}
}

export class UpdatePatientAttachmentsComment {
  static readonly type = '[Patients attachments] Update patient Attachments comment';

  constructor(
    public patientId: string,
    public attachmentId: string,
    public comment: string,
  ) {}
}

export class DownloadPatientAttachments {
  static readonly type = '[Patients attachments] Download  patient attachment';

  constructor(
    public patientId: string,
    public attachmentId: string | string[],
  ) {}
}

export class DeletePatientAttachments {
  static readonly type = '[Patients attachments] Delete  patient attachment';

  constructor(
    public patientId: string,
    public attachmentId: string,
  ) {}
}

export class SentAttachmentsToHHAEx {
  static readonly type = '[Patients attachments] Sent  patient attachment to HHAEx';

  constructor(
    public patientId: string,
    public attachmentId: string,
  ) {}
}
