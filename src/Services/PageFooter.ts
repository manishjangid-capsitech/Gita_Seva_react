import { ApiUtility } from "./ApiUtility";

class FooterService {
  route = "/posts";
  footerauthorRoute = "/api/authors?lang=";

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

  getauthorData = (lang: string, authorfor: string, limit: number) => {
    return ApiUtility.get(
      this.footerauthorRoute +
        lang +
        "&authorFor=" +
        authorfor +
        "&limit=" +
        limit
    );
  };
}

export default new FooterService();
