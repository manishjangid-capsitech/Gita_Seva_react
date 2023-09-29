import { ApiUtility } from "./ApiUtility";

class VivekService {
  route = "/posts";
  vaniRoute = "/api/vivekvanis?lang=";
  categoryRoute = "/api/settings/filters?lang=";
  authorRoute = "/api/authors/slug-";

  vivekdetailRoute = "/api/VivekVanis/";           
  faviroute = "/api/VivekVanis/";


  get = (id: string) => ApiUtility.getResult(`${this.route}/${id}`);

  getFilters = (productFor: string) => {
    return ApiUtility.get(
      this.categoryRoute +
        localStorage.getItem("lan") +
        "&productFor=" +
        productFor
    );
  };

  getVanis = (
    start: number,
    length: number,
    categoryId: string,
    IsChildLiterature: boolean,
    sort: string,
    authorId: string,
    search: string,
    langId: string,
    isSpecial: boolean
  ) => {
    return ApiUtility.get(
      this.vaniRoute +
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
        "&bookLangauge=" +
        langId +
        "&isSpecial=" +
        isSpecial
    );
  };

  GetAuthorDataById = (id: string, lang: string) => {
    return ApiUtility.get(this.authorRoute + id + "?lang=");
  };

  // vivek vani details


  VikekDetailService = (id: string, userId: string) => {
    return ApiUtility.get(
      this.vivekdetailRoute +
        id +
        "?UserId=" +
        userId +
        "&lang=" +
        localStorage.getItem("lan")
    );
  };

  getRelatedVanis = (id: string, lang: string, authorId: string) => {
    if (id === "") {
      id = "null";
    }
    return ApiUtility.get(
      this.vivekdetailRoute +
        id +
        "/related?lang=" +
        localStorage.getItem("lan") +
        "&authorId=" +
        authorId
    );
  };

  addFavourite = (id: string) => ApiUtility.post(`/api/VivekVanis/${id}/favourite`, {
    Headers:{
      authorization: localStorage.getItem("UserId"),
      Accept: "application/json"
    }
  });

  removeFavourite = (id: string) => ApiUtility.delete(`/api/VivekVanis/${id}/favourite`);
  

}
export default new VivekService();
