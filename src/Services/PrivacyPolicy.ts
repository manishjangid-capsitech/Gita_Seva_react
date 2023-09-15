import { ApiUtility } from "./ApiUtility";

class PrivacyPolicyService {
  route = "/posts";
  privacypolicyRoute = "/api/Settings/pageitem?id=3&lang=";

  get = (id: string) => ApiUtility.getResult(`${this.route}/${id}`);


  getPrivacyPolicyData = (lang: string) => {
    return ApiUtility.get(this.privacypolicyRoute + lang);
  };
}
export default new PrivacyPolicyService();
