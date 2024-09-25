import { ApiUtility } from "./ApiUtility";

class AudioPlayerService {
  route = "/posts";

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

  getlyrics = (id: any,type: string) => {
    return ApiUtility.getResponse(
      "/api/" + type + "/" + id + "/lyrics",
      {
        Headers: {
          authorization: localStorage.getItem("UserId"),
          Accept: "application/json"
        }
      }
    )
    return ApiUtility.getAuthHeader(`/api/Audios/${id}/lyrics`)
  }
}

export default new AudioPlayerService();