
export enum UserVerifyStatus {
    Unverified,
    Verified,
    Banned
  }
  
  
//NOTE - CHANGE ORDER, CHANGE LOGIC
export enum TokenType{
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}