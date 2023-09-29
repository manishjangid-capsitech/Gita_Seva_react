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

  get = (id: string) => ApiUtility.getResult(`${this.route}/${id}`);

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
