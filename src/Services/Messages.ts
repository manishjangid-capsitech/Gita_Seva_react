import { ApiUtility } from "./ApiUtility";

class MessagesServices {
  messages = "/api/messages?lang=";
  messagedetail = "/api/messages/";

  getmessage = (start: number, length: number) => {
    return ApiUtility.get(
      this.messages +
        localStorage.getItem("lan") +
        "&start=" +
        start +
        "&length=" +
        length +
        ""
    );
  };

  getmessageDetail = (id: string) => {
    return ApiUtility.get(
      this.messagedetail + id + "?lang=" + localStorage.getItem("lan")
    );
  };
}
export default new MessagesServices();
