import { ApiUtility } from "./ApiUtility";

class ArticlesDetailService {
  route = "/posts";
  articleRoute = "/api/articles/";
  faviroute = "/api/articles/";

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
export default new ArticlesDetailService();
