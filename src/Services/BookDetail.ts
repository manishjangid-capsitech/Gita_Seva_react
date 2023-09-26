import { ApiUtility } from "./ApiUtility";

class BookDetailService {
  route = "/posts";
  bookdetailRoute = "/api/books/";
  faviroute = "/api/books/";

  get = (id: string) => ApiUtility.getResult(`${this.route}/${id}`);

  getCurrentBook = (id: string, userId: string) => {
    return ApiUtility.get(
      this.bookdetailRoute +
        id +
        "?UserId=" +
        userId +
        "&lang=" +
        localStorage.getItem("lan")
    );
  };

  getRelatedBooks = (id: string, authorId: string) => {   
    return ApiUtility.get(
      this.bookdetailRoute +
        id +
        "/related?lang=" +
        localStorage.getItem("lan") +
        "&authorId=" +
        authorId
    );
  };

  addFavourite = (id: string) => ApiUtility.post(`/api/Books/${id}/favourite`, {
    Headers:{
      authorization: localStorage.getItem("UserId"),
      Accept: "application/json"
    }
  });

  removeFavourite = (id: string) => ApiUtility.delete(`/api/Books/${id}/favourite`);


}
export default new BookDetailService();
