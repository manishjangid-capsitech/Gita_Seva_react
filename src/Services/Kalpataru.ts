import { ApiUtility } from "./ApiUtility";

class KalpataruServices {
  kalpataruRoute = "/api/settings/filters?lang=";
  kalpatarudata = "/api/kalyanskalpataru?lang=";
  kalpatarudetailRoute = "/api/KalyansKalpataru/";
  favourite = "/api/kalyanskalpataru/";

  getFilters(lang: string, productFor: string) {
    return ApiUtility.get(
      this.kalpataruRoute + lang + "&productFor=" + productFor
    );
  }

  getKalyansKalpataru(
    start: number,
    length: number,
    IsChildLiterature: boolean,
    categoryId: string,
    authorId: string,
    search: string,
    sort: string,
    langId: string,
    isSpecial: boolean
  ) {
    return ApiUtility.get(
      this.kalpatarudata +
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
        "&kalyankalpataruLangauge=" +
        langId +
        "&isSpecial=" +
        isSpecial
    );
  }

  getcurrentKalpatarul(id: string, userId: string) {
    return ApiUtility.get(
      this.kalpatarudetailRoute +
        id +
        "?UserId=" +
        userId +
        "&lang=" +
        localStorage.getItem("lan")
    );
  }

  getRelatedKalpatrau(id: string, userId: string) {
    return ApiUtility.get(
      this.kalpatarudetailRoute +
        id +
        "/related?lang=hindi" +
        "&userId=" +
        userId
    );
  }

  addKalpatruFavourite = (id: string) => {
    return ApiUtility.post(this.favourite + id + "/favourite", {});
  };

  removeKalpatruFavourite = (id: string) => {
    return ApiUtility.delete(this.favourite + id + "/favourite");
  };
}
export default new KalpataruServices();
