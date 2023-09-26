import { ApiUtility } from "./ApiUtility";

class VikekDetailService {
  route = "/posts";
  bookdetailRoute = "/api/VivekVanis/";           
  faviroute = "/api/VivekVanis/";

  VikekDetailService = (id: string, userId: string) => {
    return ApiUtility.get(
      this.bookdetailRoute +
        id +
        "?UserId=" +
        userId +
        "&lang=" +
        localStorage.getItem("lan")
    );
  };

  getRelatedVanis = (id: string, lang: string, authorId: string) => {
    if (id === "") {
      id = "null";
    }
    return ApiUtility.get(
      this.bookdetailRoute +
        id +
        "/related?lang=" +
        localStorage.getItem("lan") +
        "&authorId=" +
        authorId
    );
  };

  addFavourite = (id: string) => ApiUtility.post(`/api/VivekVanis/${id}/favourite`, {
    Headers:{
      authorization: localStorage.getItem("UserId"),
      Accept: "application/json"
    }
  });

  removeFavourite = (id: string) => ApiUtility.delete(`/api/VivekVanis/${id}/favourite`);
  
}
export default new VikekDetailService();
