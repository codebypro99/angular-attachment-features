# Angular Attachment Management Feature Samples

Angular and NGXS excerpts demonstrating attachment-list state, explicit attachment actions, and route-triggered data loading.

## Purpose

These samples show how I organize attachment operations around action contracts, a state layer, and a route resolver. Original patient-domain identifiers are preserved; the included files contain implementation logic rather than patient records.

## Attachment Action Contracts

**Source:** [patient-attachments.actions.ts](./features/patient-attachments.actions.ts)

Defines actions for loading attachments, updating a title, adding a comment, retrieving download links, deleting an attachment, and requesting synchronization with an external integration.

- Uses named action classes and static action identifiers.
- Carries the parent record ID and attachment ID explicitly.
- Provides a title payload for renaming and a string payload for comments.
- Allows a single attachment ID or an array of IDs for download-link retrieval.

**What this demonstrates:** expressing user operations as explicit messages with operation-specific inputs.

## Attachment State and Service Coordination

**Source:** [patient-attachments.state.ts](./features/patient-attachments.state.ts)

Stores the attachment list and total count and delegates attachment operations to an application service.

- Exposes selectors for list data and total count.
- Reads current attachment filters from shared filter state.
- Builds request parameters for search, sorting, pagination, date bounds, and the first selected external-integration filter value.
- Removes empty filter values through a shared helper.
- Patches the list and count after a successful fetch.
- Returns service observables for rename, comment, delete, and external synchronization operations.
- Opens a returned download link through an application helper when a link exists.

**What this demonstrates:** separating action handling and state updates from API access and download behavior.

**Behavior boundaries:** mutation handlers do not refresh or patch the attachment list. Loading flags and error state are not modeled here. The deletion handler is decorated for DeletePatientAttachments but its parameter is typed as UpdatePatientAttachmentsComment; the properties used are shared by both action types.

## Route Resolver

**Source:** [patient-attachments.resolver.ts](./features/patient-attachments.resolver.ts)

Checks the route's id parameter and dispatches a list-loading action when it is present.

- Injects the NGXS store.
- Builds an action array from the route parameter.
- Takes one store snapshot before dispatching the actions.
- Returns the resulting observable to the router.

**What this demonstrates:** coordinating data loading with navigation rather than requiring the page to initiate its first fetch.

## Technologies

Angular dependency injection and Router resolvers, NGXS actions and selectors, TypeScript, and RxJS observables.

## Excerpt Context

The API service, filter-state registration, attachment model, route configuration, UI components, link helper, and external-integration implementation belong to the surrounding application. These files do not implement attachment upload or enforce authorization.

Original code and imports are preserved. The files are grouped for portfolio review rather than recreating their original workspace directory layout. Descriptions are based on source inspection; the excerpts have not been compiled or executed in isolation.

## Portfolio Message

I can organize document-related Angular features with explicit action contracts, selector-based state access, shared filtering, and route-level loading coordination.
