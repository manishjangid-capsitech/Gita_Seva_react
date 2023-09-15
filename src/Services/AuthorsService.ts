import { ApiUtility } from "./ApiUtility";

class AuthorService {
  route = "/posts";
 authordata = "/api/authors/slug-";
               

  GetAuthorDataById = (id: string, lang: string, userId: string) => {
    return ApiUtility.get(
      this.authordata +
        id +
        "?lang=" +
        lang +
        "&userId=" +
        userId,
    );
  }

}
export default new AuthorService();
