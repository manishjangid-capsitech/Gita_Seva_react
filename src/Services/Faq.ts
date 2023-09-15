import { ApiUtility } from "./ApiUtility";

class FaqService {
  route = "/posts";
  faqRoute = "/api/Settings/pageitem?id=4&lang=";

  get = (id: string) => ApiUtility.getResult(`${this.route}/${id}`);

  getFaqData = (lang:string) => {
    return ApiUtility.get(this.faqRoute + lang)
  };
}
export default new FaqService();
