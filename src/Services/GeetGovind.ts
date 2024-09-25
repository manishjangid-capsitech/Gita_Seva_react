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
    search: string,
    start: number,
    length: number,
    categoryId: string,
    IsChildLiterature: boolean,
    sort: string,
    authorId: string,
    monthlymagazineLangauge: string,
    isSpecial: boolean,
    subjectId: string,
    userId: string
  ) {
    return ApiUtility.get(
      this.magzinedata +
      localStorage.getItem("lan") +
      "&search=" +
      search +
      "&start=" +
      start +
      "&length=" +
      length +
      "&categoryId=" +
      categoryId +
      "&IsChildLiterature=" +
      IsChildLiterature +
      "&sort=" +
      sort +
      "&authorId=" +
      authorId +
      "&monthlymagazineLangauge=" +
      monthlymagazineLangauge +
      "&isSpecial=" +
      isSpecial +
      "&subjectId=" +
      subjectId +
      "&userId=" +
      userId

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
