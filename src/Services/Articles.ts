import { ApiUtility } from "./ApiUtility";

class ArticlesService {
  route = "/posts";
  articleRoute = "/api/articles?lang=";
  categoryRoute = "/api/settings/filters?lang=";

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
}
export default new ArticlesService();
