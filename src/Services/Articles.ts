import { userId } from "../Contexts/LocaleContext";
import { ApiUtility } from "./ApiUtility";

class ArticlesService {
  route = "/posts";
  articleRoute = "/api/articles?lang=";
  categoryRoute = "/api/settings/filters?lang=";
  authorlang =  "/api/authors/slug-";
  faviroute = "/api/articles/";

  GetAuthorDataById = (id: string) => {
    return ApiUtility.get(
      this.authorlang +
        id +
        "?lang=" +
        localStorage.getItem("lan") +
        "&userId=" +
        userId
    );
  }

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

  getFilters = (productFor: string) => {
    return ApiUtility.get(
      this.categoryRoute + localStorage.getItem("lan") + "&productFor=" + productFor
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

  get = (id: string) => ApiUtility.getResult(`${this.route}/${id}`);

  getArticlesDetail = (id: string, userId: string) => {
    return ApiUtility.get(
      this.articleRoute +
        id +
        "?UserId=" +
        userId +
        "&lang=" +
        localStorage.getItem("lan")
    );
  };

  addArticlesFavourite = (ArticleId: string) => {
    return ApiUtility.post(this.faviroute + ArticleId + "/favourite", {});
  };

  removeArticlesFaviourite = (ArticleId: string) => {
    return ApiUtility.delete(this.faviroute + ArticleId + "/favourite");
  };
}
export default new ArticlesService();
