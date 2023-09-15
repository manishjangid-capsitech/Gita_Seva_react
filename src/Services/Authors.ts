import { ApiUtility } from "./ApiUtility";

class AuthorsService {
  route = "/posts";
  authorRoute = "/api/authors/slug-";
  autroute =  "/api/authors?lang="

  get = (id: string) => ApiUtility.getResult(`${this.route}/${id}`);

  getAuthorData = (authorfor: string, limit: number) => 
    ApiUtility.get(this.autroute + localStorage.getItem("lan"), { authorfor, limit })
  

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

  getAuthors = (id: string, lang: string, userId: string) => {
    return ApiUtility.get(
      this.authorRoute +
        "5bbc60101fd2d735b0087d36?lang=" +
        lang +
        "&userId=" +
        userId
    );
  };
}
export default new AuthorsService();
