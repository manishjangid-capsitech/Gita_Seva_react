import { ApiUtility } from "./ApiUtility";

class EpubService {
  route = "/posts";
  aboutRoute = "/api/settings/aboutus?lang=";
  refreshtoken = "/api/user/refreshtoken?userId=";
  lastpositionRoute = "/api/user/";
  savevivekvanibookmarks = "/api/user/vivekvanimarks?vivekvaniId=";
  getvivekvanibookmarks = "/api/user/vivekvanimarks?vivekvaniId=";
  removevanimark = "/api/user/vivekvanimarks?vivekvaniId=";
  removebkmark = "/api/user/bookmarks?bookId=";
  getbkmark = "/api/user/bookmarks?BookId=";

  get = (id: string) => ApiUtility.getResult(`${this.route}/${id}`);

  getAboutData = (lang: string) => {
    return ApiUtility.get(this.aboutRoute + lang);
  };

  RefreshToken = () => {
    return ApiUtility.get(this.refreshtoken + "&medium=1&fcm_token=''");
  };

  SaveLastPositionAndClose = (
    lstposition: string,
    bookId: string,
    last_cfi: string,
    bookfontsize: string
  ) => {
    return ApiUtility.post(
      this.lastpositionRoute +
      lstposition +
      "?bookId=" +
      bookId +
      "&cfi=" +
      last_cfi +
      "&bookfontsize=" +
      bookfontsize,
      {
        Headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  };

  savebookmark = (
    bookmarkposition: string,
    bookId: string,
    cfi: string,
    chaptername: string
  ) => {
    return ApiUtility.post(
      this.lastpositionRoute +
      bookmarkposition +
      "?bookId=" +
      bookId +
      "&cfi=" +
      cfi +
      "&chaptername=" +
      chaptername,
      {
        Headers: {
          authorization: localStorage.getItem("UserId"),
          Accept: "application/json",
        },
      }
    );
  };

  savevivekvanimark = (
    bookId: string,
    cfi: string,
    chaptername: string
  ) => {
    return ApiUtility.post(
      this.savevivekvanibookmarks +
      bookId +
      "&cfi=" +
      cfi +
      "&chaptername=" +
      chaptername,
      {
        Headers: {
          authorization: localStorage.getItem("UserId"),
          Accept: "application/json",
        },
      }
    );
  };

  getvivekvanimark = (bookId: string) => {
    return ApiUtility.get(this.getvivekvanibookmarks + bookId);
  };

  deletevivekmark(bookId: string, cfi: string) {
    return ApiUtility.delete(this.removevanimark + bookId + "&cfi=" + cfi);
  }


  removebookmark(bookmarkposition: string, bookId: string, cfi: string) {
    return ApiUtility.delete(this.lastpositionRoute + bookmarkposition + "?bookId=" + bookId + "&cfi=" + cfi);
  }

  getbookmark = (bookmarkposition: string, bookId: string) => {
    return ApiUtility.get(this.lastpositionRoute + bookmarkposition + "?bookId=" + bookId);
  };

  getLastPosition(lstposition: string, bookId: string) {
    return ApiUtility.get(this.lastpositionRoute + lstposition + "?bookId=" + bookId,
      {
        Headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  }
}

export default new EpubService();