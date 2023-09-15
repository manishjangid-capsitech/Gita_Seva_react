import { ApiUtility } from "./ApiUtility";

class PravachanPlayerService {
  route = "/posts";
  pravachanRoute = "/api/pravachans?lang=";

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

  getPravachansById = (id: string) => {
    return ApiUtility.get(
      "/api/pravachans/" + id + "?lang=" + localStorage.getItem("lan")
    );
  };

  getPravachanPlayer = (
    lang: string,
    start: number,
    length: number,
    IsChildLiterature: boolean,
    authorId: string,
    categoryId: string,
    pravachanId: string,
    search: string,
    sort: string,
    langId: string,
    isSpecial: boolean
  ) => {
    return ApiUtility.get(
      this.pravachanRoute +
        lang +
        "&start=0" +
        start +
        "&length=" +
        length +
        "&categoryId=" +
        categoryId +
        "&IsChildLiterature=" +
        IsChildLiterature +
        "&authorId" +
        // AuthorId +
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
}
export default new PravachanPlayerService();
