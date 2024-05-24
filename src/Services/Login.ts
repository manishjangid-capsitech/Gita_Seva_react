import { ApiUtility } from "./ApiUtility";

class LoginServices {
  login = "/api/user/login";
  kalyandata = "/api/kalyans?lang=";
  kalyandetailRoute = "/api/Kalyans/";
  loginwithmobilenumber = "/api/user/sendotp?mobileno=";
  headerlogin = "/api/user/login";


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

  // sendOtp = (
  //   mobileno: string
  // ) => {
  //   return ApiUtility.get(this.loginwithmobilenumber + mobileno + "&oldKey=1")
  // }
  sendOtp = (
    mobileno: string,
    oldKey: string
  ) => {
    return ApiUtility.get(`https://apidev.gitaseva.org/v1/api/user/sendotp?mobileno=${mobileno}&oldKey=${oldKey}`)
  }


  validOtp = (key: string, value: string) => {
    return ApiUtility.post(`https://apidev.gitaseva.org/v1/api/user/validateotp?key=${key}&value=${value}`, {})
  }

  // UserLogin = (
  //   countryCode: string,
  //   phoneNumber: string,
  //   medium: 0,
  //   language: string,
  //   fcm_token: string,
  //   emailId: string,
  //   signInMode: 1,
  //   name: string,
  //   imagePath: string,
  //   facebook_Id: string,
  //   bookView: string,
  //   device_Id: string
  // ) => {
  //   return ApiUtility.post(`/user/Login=countryCode${countryCode}phoneNumber: phoneNumber,
  //     medium: 0,
  //     language: language,
  //     fcm_token: fcm_token,
  //     emailId: emailId,
  //     signInMode: 1,
  //     name: name,
  //     imagePath: imagePath,
  //     facebook_Id: facebook_Id,
  //     bookView: bookView,
  //     device_Id: device_Id
  //   }'
  //   );
  // };

  // addBookFavourite = (id: string, params: any) => {
  //   return ApiUtility.post(this.faviroute + id + "/favourite", params);
  // };

}
export default new LoginServices();
