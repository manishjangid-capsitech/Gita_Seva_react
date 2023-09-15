import { ApiUtility } from "./ApiUtility";

class TermsOfUseService {
  route = "/posts";
  termsofuseRoute = "/api/Settings/pageitem?id=2&lang=";

  get = (id: string) => ApiUtility.getResult(`${this.route}/${id}`);

  getTermsOfUseData = (lang: string) => {
    return ApiUtility.get(this.termsofuseRoute + lang);
  };
}
export default new TermsOfUseService();
