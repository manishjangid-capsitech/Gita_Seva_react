import { ApiUtility } from "./ApiUtility";

class LoginServices {
  login = "/api/user/login";
  kalyandata = "/api/kalyans?lang=";
  kalyandetailRoute = "/api/Kalyans/";

  getUserLogin = (
    countryCode: string,
    phoneNumber: string,
    EmailId: string,
    SignInMode: number,
    Name: string,
    ImagePath: string,
    Fcm_Token: string
  ) => {
    return ApiUtility.post(this.login, {
      countryCode: countryCode,
      phoneNumber: phoneNumber,
      medium: "2",
      language: localStorage.getItem("lan"),
      fcm_token: Fcm_Token,
      emailid: EmailId,
      signinmode: SignInMode,
      name: Name,
      imagepath: ImagePath,
      facebook_Id: "",
      bookView: "",
      device_Id: "",
    });
  };

  // UserLogin = (
  //   countryCode: string,
  //   emailid: string,
  //   fcm_token: string,
  //   imagepath: string,
  //   name: string,
  //   phoneNumber: string,

  //   // countryCode: string,
  //   // phoneNumber: string,
  //   // EmailId: string,
  //   // SignInMode: string,
  //   // Name: string,
  //   // ImagePath: string,
  //   // Fcm_Tokan: string
  // ) => {
  //   return ApiUtility.post(
  //     this.login,
  //     "&countryCode=" +
  //       countryCode +
  //       "&emailId" +
  //       emailid +
  //       "&fcm_token" +
  //       fcm_token +
  //       "&imagePath" +
  //       imagepath +
  //       "&medium=1" +
  //       "&name" +
  //       name +
  //       "&phoneNumber=" +
  //       phoneNumber +       
  //       "&signInMode=1"    
  //     // "&countryCode=" +
  //     //   countryCode +
  //     //   "&phoneNumber=" +
  //     //   phoneNumber +
  //     //   "&medium=1" +
  //     //   "&fcm_token=" +
  //     //   Fcm_Tokan +
  //     //   "&emailid=" +
  //     //   EmailId +
  //     //   "&signinmode=" +
  //     //   SignInMode +
  //     //   "&name=" +
  //     //   Name +
  //     //   "&imagepath=" +
  //     //   ImagePath
  //   );
  // };

  // addBookFavourite = (id: string, params: any) => {
  //   return ApiUtility.post(this.faviroute + id + "/favourite", params);
  // };
}
export default new LoginServices();
