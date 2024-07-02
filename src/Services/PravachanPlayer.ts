import { ApiUtility } from "./ApiUtility";

class PravachanPlayerService {
  route = "/posts";
  pravachanRoute = "/api/pravachans?lang=";

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
