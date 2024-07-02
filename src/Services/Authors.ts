import { ApiUtility } from "./ApiUtility";

class AuthorsService {
  route = "/posts";
  authorRoute = "/api/authors/slug-";
  autroute = "/api/authors?lang=";

  getAuthorData = (authorfor: string, limit: number) =>
    ApiUtility.get(this.autroute + localStorage.getItem("lan"), {
      authorfor,
      limit,
    });

  getAuthors = (id: string, lang: string, userId: string) => {
    return ApiUtility.get(
      this.authorRoute +
        "5bbc60101fd2d735b0087d36?lang=" +
        lang +
        "&userId=" +
        userId
    );
  };

  GetAuthorDataById = (id: string, userId: string) => {
    return ApiUtility.get(
      this.authorRoute + id + "?lang=" + localStorage.getItem("lan") + userId
    );
  };
}
export default new AuthorsService();
