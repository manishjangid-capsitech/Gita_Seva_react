import { ApiUtility } from "./ApiUtility";

export interface ISearchParams {
  productType: string;
  language: string;
  searchValue: string;
  authorId: string;
}

class SearchDataService {
  route = "/posts";
  searchRoute = "/api/settings/search?searchtext=";
  profilepath = "/api/user/profilepicture?id="

  profileimg = (userId: string) => {
    return ApiUtility.get(
      this.profilepath + userId + "&isThumb=" + 1
    );
  };

  searchData = (value: ISearchParams) => {
    return ApiUtility.get(
      this.searchRoute +
      value.searchValue +
      "&product=" +
      value.productType +
      "&lang=" +
      localStorage.getItem("lan") +
      "&authorId=" +
      value.authorId
    );
  };
}
export default new SearchDataService();
