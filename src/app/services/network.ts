import {HttpErrorResponse} from "@angular/common/http";

export function isNetworkProblem(error: any): boolean {
  return (error instanceof HttpErrorResponse && error.status === 0)
    || (error instanceof ErrorEvent)
    || (error instanceof ProgressEvent);
}

export function isLoadingChunkFailed(error: any): boolean {
  return error.message != null && /Loading chunk [\d]+ failed/.test(error.message);
}
