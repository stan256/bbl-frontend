export class Alert {
  constructor(public type: AlertType, public text: string, public cssClass: string){}
}

export class AlertSuccess extends Alert {
  constructor(text: string) {
    super('success', text, "alert alert-success");
  }
}

export class AlertError extends Alert {
  constructor(text: string) {
    super('error', text, "alert alert-danger");
  }
}

export type AlertType = 'success' | 'error'
