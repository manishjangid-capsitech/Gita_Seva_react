import { ApiUtility } from "./ApiUtility";

class PravachansService {
  route = "/posts";
  pravachanRoute = "/api/pravachans?lang=";
  categoryRoute = "/api/settings/filters?lang=";

  getFilters = (lang: string, productFor: string) => {
    return ApiUtility.get(
      this.categoryRoute + lang + "&productFor=" + productFor
    );
  };

  getPravachans = (
    lang: string,
    start: number,
    length: number,
    IsChildLiterature: boolean,
    categoryId: string,
    authorId: string,
    search: string,
    sort: string,
    langId: string,
    isSpecial: boolean,
    month: string,
    year: string
  ) => {
    return ApiUtility.get(
      this.pravachanRoute +
        lang +
        "&start=" +
        start +
        "&length=" +
        length +
        "&categoryId=" +
        categoryId +
        "&IsChildLiterature=" +
        IsChildLiterature +
        "&authorId=5bbc60101fd2d735b0087d36" +
        "&search=" +
        search +
        "&sort=" +
        sort +
        "&bookLangauge=" +
        langId +
        "&isSpecial=" +
        isSpecial +
        "&month=" +
        month +
        "&year=" +
        year
    );
  };
}
export default new PravachansService();
