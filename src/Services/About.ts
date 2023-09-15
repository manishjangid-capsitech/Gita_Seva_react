import { ApiUtility } from "./ApiUtility";

class AboutService {
  route = "/posts";
  aboutRoute = "api/Settings/aboutus?lang=";
               

  get = (id: string) => ApiUtility.getResult(`${this.route}/${id}`);

  getAboutData = (lang: string) => {
    return ApiUtility.get(this.aboutRoute +  lang );
  };
}
export default new AboutService();
