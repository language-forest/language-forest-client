// react-native-haptic-feedback 라이브러리의 타입을 그대로 가져옵니다.
// 라이브러리 버전이 달라지면 따라 변경해야할 수 있습니다.
// 그 중 iOS, Android 둘다 가능한 것만 올려둠
export enum HapticFeedbackTypes {
  impactLight = "impactLight",
  impactMedium = "impactMedium",
  impactHeavy = "impactHeavy",
  rigid = "rigid",
  soft = "soft",
  notificationSuccess = "notificationSuccess",
  notificationWarning = "notificationWarning",
  notificationError = "notificationError",
}
