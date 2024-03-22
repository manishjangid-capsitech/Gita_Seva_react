import { userId } from "../Contexts/LocaleContext";
import { ApiUtility } from "./ApiUtility";

class AudiosService {
  route = "/posts";
  audioRoute = "/api/" + localStorage.getItem("type") + "?lang=";
  categoryRoute = "/api/settings/filters?lang=";
  categoryRouteAudio = "/api/Audios/Categories?lang=";
  pravachanfav = "/api/pravachans/";
  audiofavroute = "/api/audios/";
  pravachanwithid = "/api/Pravachans/"

  getPravachanFilters = (productFor: string) => {
    return ApiUtility.get(
      this.categoryRoute + localStorage.getItem("lan") + "&productFor=" + productFor
    );
  };

  getFilters = (productFor: string) => {
    return ApiUtility.get(
      this.categoryRoute + localStorage.getItem("lan") + "&productFor=" + productFor
    );
  };

  getAudioCategories = () => {
    return ApiUtility.get(
      this.categoryRouteAudio + localStorage.getItem("lan"),
    );
  }


  getAudiosById = (id: string, type: string) => {
    return ApiUtility.get(
      "/api/" + type + "/" + id + "?lang=" + localStorage.getItem("lan")
    );
  };

  getAudios = (
    start: number,
    length: number,
    IsChildLiterature: boolean,
    categoryId: string,
    authorId: string,
    search: string,
    sort: string,
    langId: string,
    isSpecial: boolean,
    type: string,
    lyrics: number = 0,
    month: string,
    year: string,
    userId: string
  ) => {
    if (type === "audios") {
      return ApiUtility.get(
        "/api/" +
        "audios" +
        "?lang=" +
        localStorage.getItem("lan") +
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
        "&lyrics=" +
        lyrics +
        "&audioLangauge=" +
        langId +
        "&isSpecial=" +
        isSpecial,
        "&userId=" + userId + "&monthyear=0"
      );
    } else {
      return ApiUtility.get(
        "/api/" +
        "pravachans" +
        "?lang=" +
        localStorage.getItem("lan") +
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
        isSpecial +
        "&userId=" +
        userId +
        "&lyrics=" +
        lyrics +
        "&month=" +
        month +
        "&year=" +
        year +
        "&monthYear=1"
      );
    }
  };

  getaudioandpravachanbyid = (id: string, userIdentity: string) => {
    if (localStorage.getItem("type") === "audios") {
      return ApiUtility.get(this.audiofavroute + id + "?lang=" + localStorage.getItem("lan") + "&userId=" + userIdentity)                                   
    }
    else {
      return ApiUtility.get(this.pravachanwithid + id + "?lang=" + localStorage.getItem("lan") + "&userId=" + userIdentity)
    }
  }

  addPravachanFavourite = (id: string) => {
    return ApiUtility.post(this.pravachanfav + id + "/favourite", {});
  };

  removePravachanFaviourite = (id: string) => {
    return ApiUtility.delete(this.pravachanfav + id + "/favourite");
  };

  addAudioFavourite = (id: string) => {
    return ApiUtility.post(this.audiofavroute + id + "/favourite", {});
  };

  removeAudioFavourite(id: string) {
    return ApiUtility.delete(this.audiofavroute + id + "/favourite");
  }

}
export default new AudiosService();
