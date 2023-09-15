import { ApiUtility } from "./ApiUtility";

class BooksService {
  route = "/posts";
  bookRoute = "/api/books?lang=";
  categoryRoute = "/api/settings/filters?lang=";
  authorRoute = "/api/authors/slug-"

  get = (id: string) => ApiUtility.getResult(`${this.route}/${id}`);

  getFilters = (productFor: string) => {
    return ApiUtility.get(
      this.categoryRoute + localStorage.getItem("lan") + "&productFor=" + productFor
    );
  };

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

  GetAuthorDataById = (id: string, lang: string) => {
    return ApiUtility.get(
      this.authorRoute +
        id +
        "?lang=" 
    );
  }
}
export default new BooksService();
