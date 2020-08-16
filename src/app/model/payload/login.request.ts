export class LoginRequest {
  email: string
  password: string
  deviceInfo: DeviceInfo
}

export class DeviceInfo {
    deviceId: string
    deviceType: DeviceType
}

export type DeviceType = 'WEB'
