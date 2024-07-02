import { ApiUtility } from "./ApiUtility";

class FooterService {
  route = "/posts";
  footerauthorRoute = "/api/authors?lang=";

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
