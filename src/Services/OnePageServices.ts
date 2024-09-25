import { ApiUtility } from "./ApiUtility";

class OnePageService {

  // aboutService

  aboutRoute = "api/Settings/aboutus?lang=";

  getAboutData = (lang: string) => {
    return ApiUtility.get(this.aboutRoute + lang);
  };

  // FaqService

  faqRoute = "/api/Settings/pageitem?id=4&lang=";

  getFaqData = (lang: string) => {
    return ApiUtility.get(this.faqRoute + lang)
  };

  // PrivacyPolicyData

  privacypolicyRoute = "/api/Settings/pageitem?id=3&lang=";

  getPrivacyPolicyData = (lang: string) => {
    return ApiUtility.get(this.privacypolicyRoute + lang);
  };

  // TermsOfUse

  termsofuseRoute = "/api/Settings/pageitem?id=2&lang=";

  getTermsOfUseData = (lang: string) => {
    return ApiUtility.get(this.termsofuseRoute + lang);
  };

  // promotion page

  promotionroute = "/api/Promotion?lang="

  getPromotionPageData = (lang: string) => {
    return ApiUtility.get(this.promotionroute + lang)
  }

}
export default new OnePageService();
