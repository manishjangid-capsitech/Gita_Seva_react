import { ApiUtility } from "./ApiUtility";

class GeetGovindServices {
  geetfilterRoute = "/api/settings/filters?lang=";
  magzinedata = "/api/monthlymagazines?lang=";
  magzinedetailRoute = "/api/MonthlyMagazines/";
  favourite = "/api/monthlymagazines/";

  getGeetFilters(productFor: string) {
    return ApiUtility.get(
      this.geetfilterRoute +
        localStorage.getItem("lan") +
        "&productFor=" +
        productFor
    );
  }

  getMonthlyMagazine(
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
      this.magzinedata +
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
        "&monthlymagazineLangauge=" +
        langId +
        "&isSpecial=" +
        isSpecial
    );
  }

  getcurrentMagazine(id: string, userId: string) {
    return ApiUtility.get(
      this.magzinedetailRoute +
        id +
        "?UserId=" +
        userId +
        "&lang=" +
        localStorage.getItem("lan")
    );
  }

  addMagzineFavourite = (id: string) => {
    return ApiUtility.post(this.favourite + id + "/favourite", {});
  };

  removeMagzineFavourite = (id: string) => {
    return ApiUtility.delete(this.favourite + id + "/favourite");
  };
}
export default new GeetGovindServices();
