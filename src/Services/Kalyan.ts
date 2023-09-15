import { ApiUtility } from "./ApiUtility";

class KalyansServices {
  kalyansRoute = "/api/settings/filters?lang=";
  kalyandata = "/api/kalyans?lang=";
  kalyandetailRoute = "/api/Kalyans/";
  favourite = "/api/kalyans/";

  getFilters(productFor: string) {
    return ApiUtility.get(
      this.kalyansRoute +
        localStorage.getItem("lan") +
        "&productFor=" +
        productFor
    );
  }
  getKalyans(
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
      this.kalyandata +
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
        "&kalyanLangauge=" +
        langId +
        "&isSpecial=" +
        isSpecial
    );
  }

  getcurrentKalyan(id: string, userId: string) {
    return ApiUtility.get(
      this.kalyandetailRoute +
        id +
        "?UserId=" +
        userId +
        "&lang=" +
        localStorage.getItem("lan")
    );
  }

  getRelatedKalyans(id: string, userId: string) {
    return ApiUtility.get(
      this.kalyandetailRoute + id + "/related?lang=" + localStorage.getItem("lan") + "&userId=" + userId
    );
  }

  addKalyanFavourite = (id: string) => {
    return ApiUtility.post(this.favourite + id + "/favourite", {});
  };

  removeKalyanFavourite = (id: string) => {
    return ApiUtility.delete(this.favourite + id + "/favourite");
  };
}
export default new KalyansServices();
