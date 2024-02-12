import { ApiUtility } from "./ApiUtility";

class EpubService {
  route = "/posts";
  aboutRoute = "/api/settings/aboutus?lang=";
  refreshtoken = "/api/user/refreshtoken?userId=";
  lastpositionRoute = "/api/user/";
  savebkmark = "/api/user";
  removebkmark = "/api/user/bookmarks?bookId=";
  getbkmark = "/api/user/bookmarks?BookId=";

  get = (id: string) => ApiUtility.getResult(`${this.route}/${id}`);

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

  savebookmarkss = (bookId: string, cfi: string, chaptername: string) =>
    ApiUtility.post(
      this.savebkmark + bookId + "&cfi=" + cfi + "&chaptername=" + chaptername,
      {
        Headers: {
          authorization: localStorage.getItem("UserId"),
          Accept: "application/json",
        },
      }
    );

  savebookmark = (
    bookmarkposition: string,
    bookId: string,
    cfi: string,
    chaptername: string
  ) =>
    ApiUtility.post(
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
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  removebookmark(bookId: string, cfi: string) {
    return ApiUtility.delete(this.removebkmark + bookId + "&cfi=" + cfi);
  }

  getbookmark = (bookId: string) => {
    return ApiUtility.get(this.getbkmark + bookId);
  };

  getLastPosition(lstposition: string, bookId: string) {
    return ApiUtility.get(
      this.lastpositionRoute + lstposition + "?bookId=" + bookId,
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
