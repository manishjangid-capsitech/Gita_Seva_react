import { ApiUtility } from "./ApiUtility";

class AudioPlayerService {
  route = "/posts";
  audioRoute = "/api/" + localStorage.getItem("type") + "?lang=";

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

  getAudiosById = (id: string, type: string) => {
    return ApiUtility.get(
      "/api/" + type + "/" + id + "?lang=" + localStorage.getItem("lan")
    );
  };

  getAudioPlayer = (
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
    type: string
  ) => {
    return ApiUtility.get(
      "/api/" +
        type +
        "?lang=" +
        lang +
        "&start=" +
        start +
        "&length=" +
        length +
        "&categoryId=" +
        categoryId +
        "&IsChildLiterature=" +
        IsChildLiterature +
        "&authorId=" +
        authorId +
        "&search=" +
        search +
        "&sort=" +
        sort +
        "&audioLangauge=" +
        langId +
        "&isSpecial=" +
        isSpecial
    );
  };
}
export default new AudioPlayerService();
