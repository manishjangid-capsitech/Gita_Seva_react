import { ApiUtility } from "./ApiUtility";

class BooksService {
  route = "/posts";
  divinequotesRoute = "/api/Quotes";
  categoryRoute = "/api/settings/filters?lang=";

  get = (id: string) => ApiUtility.getResult(`${this.route}/${id}`);

  getFilters = (lang: string, productFor: string) => {
    return ApiUtility.get(
      this.categoryRoute + lang + "&productFor=" + productFor
    );
  };

  getDivineQuotesId(id: string) {
    return ApiUtility.get(
      this.divinequotesRoute + id + "?lang=" + localStorage.getItem("lan")
    );
  }

  getDivineQuotes = (search: string, start: number, length: number) => {
    return ApiUtility.get(
      this.divinequotesRoute +
        "?search=" +
        search +
        "&start=" +
        start +
        "&length=" +
        length
    );
  };
}
export default new BooksService();
