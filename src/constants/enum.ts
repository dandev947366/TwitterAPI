

export enum UserVerifyStatus {
    Unverified,
    Verified,
    Banned
  }
  
interface Media {
  url: string
  type: MediaType
}
  
enum MediaType {
  Image,
  Video
}

enum TweetAudience {
  Everyone,
  TwitterCirle
}

enum TweetType{
  Tweet,
  Retweet,
  Comment,
  QuoteTweet
}
//NOTE - CHANGE ORDER, CHANGE LOGIC
export enum TokenType{
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}