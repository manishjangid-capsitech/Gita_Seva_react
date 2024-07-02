import { ApiUtility } from "./ApiUtility";

class HeaderService {
  route = "/posts";
  headerauthorRoute = "/api/user/login";
  searchRoute ="/api/Settings/search"

  searchData = (searchCategory: string, search: string, lang: string) => {
    return ApiUtility.get(
      "/api/settings/search?searchtext=" +
        search +
        "&product=" +
        searchCategory +
        "&lang=" +
        localStorage.getItem("lan")
    );
  };

  getUserLogin = (
    countryCode: string,
    phoneNumber: string,
    EmailId: string,
    SignInMode: number,
    Name: string,
    ImagePath: string,
    Fcm_Token: string
  ) => {
    return ApiUtility.post(this.headerauthorRoute, {
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

  searchApi = ( product: string, searchtext: string, lang: string, authorId: string) => {
    return ApiUtility.get( 
      "/api/Settings/search?searchtext=" +
      searchtext + 
      "&product=" +
      product + 
      "&lang=" +
      localStorage.getItem("lan")
    )
  }
}
export default new HeaderService();
