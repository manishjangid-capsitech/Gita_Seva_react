import { ApiUtility } from "./ApiUtility";

class BooksService {
  route = "/posts";
  bookRoute = "/api/books?lang=";
  categoryRoute = "/api/settings/filters?lang=";
  authorRoute = "/api/authors/slug-";
  languagebyid = "/api/languages/";

  bookdetailRoute = "/api/books/";
  faviroute = "/api/books/";

  get = (id: string) => ApiUtility.getResult(`${this.route}/${id}`);

  getFilters = (productFor: string) => {
    return ApiUtility.get(
      this.categoryRoute +
        localStorage.getItem("lan") +
        "&productFor=" +
        productFor
    );
  };

  GetLanguageDataById(id: string) {
    return ApiUtility.get(
      this.languagebyid + id + "?lang=" + localStorage.getItem("lan")
    );
  }

  getepubstream(bookId: string, headerWithAuth: any) {
    return ApiUtility.get(
      "api/Books/" + bookId + "/epubstream/" + bookId + ".epub",
      //this.domainname + "/api/books/" + bookId + "/epub/",
      { headers: headerWithAuth }
    );
  }

  getBooks = (
    start: number,
    length: number,
    IsChildLiterature: boolean,
    categoryId: string,
    authorId: string,
    search: string,
    sort: string,
    langId: string,
    isSpecial: boolean
  ) => {
    return ApiUtility.get(
      this.bookRoute +
        localStorage.getItem("lan") +
        "&start=" +
        start +
        "&length=" +
        length +
        "&IsChildLiterature=" +
        IsChildLiterature +
        "&categoryId=" +
        categoryId +
        "&authorId=" +
        authorId +
        "&search=" +
        search +
        "&sort=" +
        sort +
        "&bookLangauge=" +
        langId +
        "&isSpecial=" +
        isSpecial
    );
  };

 

  // book detail

  getCurrentBook = (id: string, userId: string) => {
    return ApiUtility.get(
      this.bookdetailRoute +
        id +
        "?UserId=" +
        userId +
        "&lang=" +
        localStorage.getItem("lan")
    );
  };

  getRelatedBooks = (id: string, authorId: string) => {   
    return ApiUtility.get(
      this.bookdetailRoute +
        id +
        "/related?lang=" +
        localStorage.getItem("lan") +
        "&authorId=" +
        authorId
    );
  };

  addFavourite = (id: string) => ApiUtility.post(`/api/Books/${id}/favourite`, {
    Headers:{
      authorization: localStorage.getItem("UserId"),
      Accept: "application/json"
    }
  });

  removeFavourite = (id: string) => ApiUtility.delete(`/api/Books/${id}/favourite`);

}
export default new BooksService();
