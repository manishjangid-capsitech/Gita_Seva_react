import { userId } from "../Contexts/LocaleContext";
import { ApiUtility } from "./ApiUtility";

class ProfileService {
  route = "/posts";
  profileRoute = "/api/user/profile?medium=1&lang=";
  favRoute = "/api/user/favourites?lang=";
  profiledata = "/api/user/profile";
  country = "/api/settings/country?lang=";
  state = "/api/settings/state?lang=";
  updateuser = "/api/user/profile"
  city = "/api/settings/state/"


  getfavData(start: number, length: number) {
    return ApiUtility.get(
      this.favRoute + localStorage.getItem("lan") + "&start=" + start + "&length=" + length
    );
  };

  getbookmarks(start: number, length: number) {
    return ApiUtility.get(
      this.favRoute + localStorage.getItem("lan") + "&start=" + start + "&length=" + length
    )
  }

  getProfile = (lang: string) => {
    return ApiUtility.get(this.profileRoute + lang);
  };

  UserProfile = (lan: any) => {
    return ApiUtility.get(
      this.profiledata + "&medium=1", "&lang=" + lan,
    );
  }

  getCountry = (lan: any) => {
    return ApiUtility.get(
      this.country + lan,
    )
  }

  getState = (lang: string) => {
    return ApiUtility.get(
      this.state + lang
    );
  }

  getDistrict = (stateId: string, lang: string) => {
    return ApiUtility.get(
      this.city + stateId + "?lang=" + lang
    )
  }

  updateUserProfile = async (
    name: string,
    email: string,
    baseFile: any,
    address1: any,
    address2: string,
    city: string,
    state: string,
    country: string,
    countrytype: string,
    pinCode: string,
    language: string,
    mobileNo: string
  ) => {
    return await ApiUtility.post(
      this.profiledata,
      {
        userId: userId,
        name: name,
        email: email,
        imagePath: baseFile,
        address: {
          address1: address1,
          address2: address2,
          city: city,
          state: state,
          country: country,
          countryType: countrytype,
          pinCode: pinCode,
        },
        language: language,
        medium: "1",
        phoneNumber: mobileNo,
      },
    );
  }

}
export default new ProfileService();
