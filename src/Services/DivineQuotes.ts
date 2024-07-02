import { ApiUtility } from "./ApiUtility";

class QuoteService {
  route = "/posts";
  divinequotesRoute = "/api/Quotes";
  categoryRoute = "/api/settings/filters?lang=";
  download = "/api/Quotes/";



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

  downloadQuotes = (id: string) => {
    return ApiUtility.get(`https://apidev.gitaseva.org/v1/api/Quotes/${id}/quote?download_attachment=true`)
  }
}
export default new QuoteService();