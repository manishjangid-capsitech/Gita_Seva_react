import { userId } from "../Contexts/LocaleContext";
import { ApiUtility } from "./ApiUtility";

class HomeServices {
  route = "/posts";
  homeRoute = "/api/settings/homepage?lang=";
  messageRoute = "/api/messages?lang=";
  messageIdRoute = "/api/articles/";
  allauthorRoute = "/api/Authors/5bbc60101fd2d735b0087d36?lang=";
  quotesRoute = "/api/Quotes?usefor=2";
  contactRoute = "/api/Settings/contactus";
  sendfeedback = "/api/settings/contactus"

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

  getQuotesData = (start: number, length: number) => {
    return ApiUtility.get(this.quotesRoute + "&start=" + start + "&length=" + length);
  };

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
    if (userId === "") {
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
