import { userId } from "../Contexts/LocaleContext";
import { ApiUtility } from "./ApiUtility";

class HomeServices {
  route = "/posts";
  homeRoute = "/api/settings/homepage?lang=";
  messageRoute = "/api/messages?lang=";
  messageIdRoute = "/api/articles/";
  allauthorRoute = "/api/Authors/5bbc60101fd2d735b0087d36?lang=";
  quotesRoute = "/api/Quotes?usefor=2&start=0&length=5";
  // contactRoute = "/api/Settings/contactus";
  contactRoute= "/api/Settings/contactuswithdevicedetails";
  sendfeedback = "/api/settings/contactus"

  get = (id: string) => ApiUtility.getResult(`${this.route}/${id}`);

  GetHomeData = (lang: string, userid: string) =>{ 
    return ApiUtility.get (this.homeRoute +   lang +
    localStorage.getItem("u+serId")
  )}  

  getList = (
    start: number,
    length: number,
    sortCol?: string,
    sortDir?: string,
    search?: string
  ) =>
    ApiUtility.get(this.route, {
      start,
      length,
      sortCol,
      sortDir,
      search,
    });

  getHomeData = (lang: string, userid: string) => {
    return ApiUtility.get(
      this.homeRoute +
        lang +
        "&userid=" +
        localStorage.getItem("userId")
    );
  };

  getMessage = (lang: string, start: number, length: number) => {
    return ApiUtility.get(
      this.messageRoute +
      "&lang" +
        lang +
        "$start" +
        start +
        "&length=" +
        length
    );
  };

  getMessageId = (id: string, lang: string) => {
    return ApiUtility.get(this.messageIdRoute + id + "?lang=" + lang);
  };

  getQuotesData = (search: string, usefor:number, start: number, length: number) => {
    return ApiUtility.get(this.quotesRoute);
  };

  //   return ApiUtility.get(this.allauthorRoute + lang + "&skipAll=true");
  // };
  postcontact = (params: any) => {
    return ApiUtility.post(this.contactRoute, params);
  };

  sendFeedback = (
    name: string,
    phoneNumber: string,
    email: string,
    feedbacktype: string,
    comment: string
  ) => {
    if (!feedbacktype) {
      feedbacktype = "1";
    }
    if (userId == "") {
      // userId = null;
    }
    return ApiUtility.post(
      this.sendfeedback ,
      {
        contactType: feedbacktype,
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        userId: userId,
        messageContent: comment,
        medium: "1",
      },

    );
  }
}
export default new HomeServices();
