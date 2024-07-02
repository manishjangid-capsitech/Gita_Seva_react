import { userId } from "../Contexts/LocaleContext";
import { ApiUtility } from "./ApiUtility";

class ArticlesService {
  route = "/posts";
  articleRoute = "/api/articles?lang=";
  articledetsil = "/api/articles/";
  categoryRoute = "/api/settings/filters?lang=";
  faviroute = "/api/articles/";

  getFilters = (productFor: string) => {
    return ApiUtility.get(
      this.categoryRoute +
        localStorage.getItem("lan") +
        "&productFor=" +
        productFor
    );
  };

  getArticles = (
    start: number,
    length: number,
    IsChildLiterature: boolean,
    categoryId: string,
    authorId: string,
    search: string,
    sort: string,
    langId: string,
    isSpecial: boolean
  ) => {
    return ApiUtility.get(
      this.articleRoute +
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
        "&bookLangauge=" +
        langId +
        "&isSpecial=" +
        isSpecial
    );
  };

  // article detail

  getArticlesDetail = (id: string, userId: string) => {
    return ApiUtility.get(
      this.articledetsil +
        id +
        "?UserId=" +
        userId +
        "&lang=" +
        localStorage.getItem("lan")
    );
  };

  addArticlesFavourite = (ArticleId: string) => {
    return ApiUtility.post(this.faviroute + ArticleId + "/favourite", {
      Headers: {
        authorization: localStorage.getItem("UserId"),
        Accept: "application/json",
      },
    });
  };

  removeArticlesFaviourite = (ArticleId: string) => {
    return ApiUtility.delete(this.faviroute + ArticleId + "/favourite");
  };
}
export default new ArticlesService();
