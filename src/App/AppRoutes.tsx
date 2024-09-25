import React from "react";
import { Route, Routes } from "react-router-dom";
import AudiosDetailPage from "../Pages/AudioPlayerPage";
import FooterPage from "./FooterPage";
import HeaderPage from "./HeaderPage";
import AboutPage from "../Pages/AboutPage";
import BooksPage from "../Pages/BooksPage";
import BookDetailPage from "../Pages/BookDetailPage";
import EpubPage from "../Pages/Epub";
import KalyansPage from "../Pages/KalyansPage";
import KalyanDetailPage from "../Pages/KalyanDetailPage";
import PravachansPage from "../Pages/PravachansPage";
import AudiosPage from "../Pages/AudiosPage";
import ArticlesPage from "../Pages/ArticlesPage";
import ArticlesDetailPage from "../Pages/ArticlesDetail";
import KalpataruPage from "../Pages/KalpataruPage";
import KalpataruDetailPage from "../Pages/KalpataruDetailPage";
import GeetgovindPage from "../Pages/GeetgovindPage";
import GeetGovindDetailPage from "../Pages/GeetGovindDetailPage";
import PrivacyPage from "../Pages/PrivacyPolicyPage";
import TearmsOfUsePage from "../Pages/TermsOfUsePage";
import FaqPage from "../Pages/FaqPage";
import AuthorsDataPage from "../Pages/AuthorsPage";
import MessagesPage from "../Pages/MesagesPage";
import MessageDetailPage from "../Pages/MessageDetail";
import SearchDataPage from "../Pages/SearchDataPage";
import { ProfileFav } from "../Pages/ProfileFav";
import { ProfileContact } from "../Pages/ProfileContact";
import VivekvaniPage from "../Pages/VivekVani";
import VivekvaniDetailPage from "../Pages/VivekVaniDetails";
import DivineQuotes from "../Pages/DivineQuotePage";
import DailySatsangPage from "../Pages/DailySatsang";
import PromotionPage from "../Pages/PromotionPage";

const HomePage = React.lazy(
  () => import("../Pages/HomePage" /* webpackChunkName: "home" */)
);

const Profile = React.lazy(
  () => import("../Pages/Profile" /* webpackChunkName: "home" */)
);

const WithHeaderFooter = ({ element }: { element: any }) => {
  return (
    <>
      <div>
        <HeaderPage />
        {element}
      </div>
      <FooterPage />
    </>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={<WithHeaderFooter element={<HomePage />} />}
        path="/"
      ></Route>

      <Route
        element={<WithHeaderFooter element={<HomePage />} />}
        path="/home"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<AboutPage />} />}
        path="/about"
      ></Route>

      {/* book */}

      <Route
        element={<WithHeaderFooter element={<BooksPage />} />}
        path="/books"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<BooksPage />} />}
        path="/books/special"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<BooksPage />} />}
        path="/books/author/:id"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<BooksPage />} />}
        path="/books/language/:langid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<BooksPage />} />}
        path="/books/category/:catid"
      ></Route>

      {/* Book Detail */}

      <Route
        element={<WithHeaderFooter element={<BookDetailPage />} />}
        path="/books/:bookid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<BookDetailPage />} />}
        path="/books/special/:bookid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<BookDetailPage />} />}
        path="/books/author/:authorId/:bookid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<BookDetailPage />} />}
        path="/books/language/:langId/:bookid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<BookDetailPage />} />}
        path="/books/category/:catId/:bookid"
      ></Route>

      {/* epub */}

      {/* <Route element={<EpubPage />} path="/reader/books/"></Route> */}
      <Route element={<EpubPage />} path="reader/:type/:id"></Route>
      {/* <Route element={<EpubPage />} path="/reader/books/:id"></Route> */}

      {/* vivekvani */}

      <Route
        element={<WithHeaderFooter element={<VivekvaniPage />} />}
        path="/vivekvani"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<VivekvaniPage />} />}
        path="/vivekvani/special"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<VivekvaniPage />} />}
        path="/vivekvani/author/:id"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<VivekvaniPage />} />}
        path="/vivekvani/language/:langid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<VivekvaniPage />} />}
        path="/vivekvani/:cat/:langid"
      ></Route>

      {/* Vivek Vani Detail */}

      <Route
        element={<WithHeaderFooter element={<VivekvaniDetailPage />} />}
        path="/vivekvani/:vaniid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<VivekvaniDetailPage />} />}
        path="/vivekvani/special/:vaniid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<VivekvaniDetailPage />} />}
        path="/vivekvani/author/:id/:vaniid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<VivekvaniDetailPage />} />}
        path="/vivekvani/category/:catid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<VivekvaniDetailPage />} />}
        path="/vivekvani/language/:langid"
      ></Route>

      {/* Kalyan */}

      <Route
        element={<WithHeaderFooter element={<KalyansPage />} />}
        path="/kalyan"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<KalyansPage />} />}
        path="/kalyan/category/:catid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<KalyansPage />} />}
        path="/kalyan/special"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<KalyansPage />} />}
        path="/kalyan/author/:id"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<KalyansPage />} />}
        path="/kalyan/language/:langid"
      ></Route>

      {/* Kalyan Detail  */}

      <Route
        element={<WithHeaderFooter element={<KalyanDetailPage />} />}
        path="/kalyan/:kalyanid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<KalyanDetailPage />} />}
        path="/kalyan/special/:kalyanid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<KalyanDetailPage />} />}
        path="/kalyan/author/:id/:kalyanid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<KalyanDetailPage />} />}
        path="/kalyan/category/:catid/:kalyanid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<KalyanDetailPage />} />}
        path="/kalyan/language/:langid/:kalyanid"
      ></Route>

      {/* Kalpataru Page */}

      <Route
        element={<WithHeaderFooter element={<KalpataruPage />} />}
        path="/kalyanakalpataru"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<KalpataruPage />} />}
        path="/kalyanakalpataru/category/:catid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<KalpataruPage />} />}
        path="/kalyanakalpataru/special"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<KalpataruPage />} />}
        path="/kalyanakalpataru/author/:id"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<KalpataruPage />} />}
        path="/kalyanakalpataru/language/:langid"
      ></Route>

      {/* Kalpataru Detail  */}

      <Route
        element={<WithHeaderFooter element={<KalpataruDetailPage />} />}
        path="/kalyanakalpataru/:kalyanid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<KalpataruDetailPage />} />}
        path="/kalyanakalpataru/special/:kalyanid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<KalpataruDetailPage />} />}
        path="/kalyanakalpataru/author/:id/:kalyanid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<KalpataruDetailPage />} />}
        path="/kalyanakalpataru/category/:catid/:kalyanid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<KalpataruDetailPage />} />}
        path="/kalyanakalpataru/language/:langid/:kalyanid"
      ></Route>

      {/* Geet Govind Page */}

      <Route
        element={<WithHeaderFooter element={<GeetgovindPage />} />}
        path="/geetgovind"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<GeetgovindPage />} />}
        path="/geetgovind/category/:catid"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<GeetgovindPage />} />}
        path="/geetgovind/special"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<GeetgovindPage />} />}
        path="/geetgovind/author/:id"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<GeetgovindPage />} />}
        path="/geetgovind/language/:langid"
      ></Route>

      {/* GeetGovindDetailPage */}

      <Route
        element={<WithHeaderFooter element={<GeetGovindDetailPage />} />}
        path="/geetgovind/:id"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<GeetGovindDetailPage />} />}
        path="/geetgovind/special/:id"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<GeetGovindDetailPage />} />}
        path="/geetgovind/author/:id"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<GeetGovindDetailPage />} />}
        path="/geetgovind/category/:catid/:id"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<GeetGovindDetailPage />} />}
        path="/geetgovind/language/:langid/:id"
      ></Route>

      {/* pravachan page */}

      <Route
        element={<WithHeaderFooter element={<PravachansPage />} />}
        path="/pravachans"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<PravachansPage />} />}
        path="/pravachans/special"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<PravachansPage />} />}
        path="/pravachans/author/:id"
      ></Route>

      {/* pravachan detail page */}

      <Route element={<AudiosDetailPage />} path="/pravachans/:id"></Route>
      <Route element={<AudiosDetailPage />} path="/pravachans/:cat/:id"></Route>

      {/* audio page */}
      <Route
        element={<WithHeaderFooter element={<AudiosPage />} />}
        path="/audios"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<AudiosPage />} />}
        path="/audios/special"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<AudiosPage />} />}
        path="/audios/author/:id"
      ></Route>

      {/* audio detail page */}

      <Route element={<AudiosDetailPage />} path="/audios/:id"></Route>
      <Route element={<AudiosDetailPage />} path="/audios/:cat/:id"></Route>
      <Route element={<AudiosDetailPage />} path="/audioPodcast/:id"></Route>

      {/* daily satsang page */}

      <Route
        element={<WithHeaderFooter element={<DailySatsangPage />} />}
        path="/audioPodcast"
      ></Route>
      {/* <Route
        element={<WithHeaderFooter element={<AudiosPage />} />}
        path="/audioPodcast/special"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<AudiosPage />} />}
        path="/audioPodcast/author/:id"
      ></Route> */}

      {/* artical page */}

      <Route
        element={<WithHeaderFooter element={<ArticlesPage />} />}
        path="/articles"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<ArticlesPage />} />}
        path="/articles/special"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<ArticlesPage />} />}
        path="/articles/author/:id"
      ></Route>

      {/* article detail page */}

      <Route
        element={<WithHeaderFooter element={<ArticlesDetailPage />} />}
        path="/articles/:id"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<ArticlesDetailPage />} />}
        path="/articles/special/:id"
      ></Route>
      <Route
        element={<WithHeaderFooter element={<ArticlesDetailPage />} />}
        path="/articles/author/:id/:articleid"
      ></Route>

      {/* Divine Quotes Page */}

      <Route
        element={<WithHeaderFooter element={<DivineQuotes />} />}
        path="/divinequotes"
      ></Route>

      <Route
        element={<WithHeaderFooter element={<MessageDetailPage />} />}
        path="/messages/:id"
      ></Route>


      {/* message Page */}

      <Route
        element={<WithHeaderFooter element={<MessagesPage />} />}
        path="/messages"
      ></Route>

      <Route
        element={<WithHeaderFooter element={<MessageDetailPage />} />}
        path="/messages/:id"
      ></Route>

      <Route
        element={<WithHeaderFooter element={<PrivacyPage />} />}
        path="/privacypolicy"
      ></Route>

      <Route
        element={<WithHeaderFooter element={<TearmsOfUsePage />} />}
        path="/termsofuse"
      ></Route>

      <Route
        element={<WithHeaderFooter element={<FaqPage />} />}
        path="/faq"
      ></Route>

      <Route element={<WithHeaderFooter element={<PromotionPage />} />}
      path="/promotion"
      ></Route>

      <Route
        element={<WithHeaderFooter element={<AuthorsDataPage />} />}
        path="/author/:id"
      ></Route>

      <Route
        element={<WithHeaderFooter element={<SearchDataPage />} />}
        path="/searchdata/:searchCategory/:search"
      ></Route>

      <Route
        element={<WithHeaderFooter element={<SearchDataPage />} />}
        path="/searchdata/:searchCategory/"
      ></Route>

      {/* profile Page's */}

      <Route
        element={<WithHeaderFooter element={<Profile />} />}
        path="/profile/"
      ></Route>

      <Route
        element={<WithHeaderFooter element={<ProfileFav />} />}
        path="/profile/fav"
      ></Route>

      <Route
        element={<WithHeaderFooter element={<ProfileContact />} />}
        path="/profile/feedback"
      ></Route>
    </Routes>
  );
};
export default AppRoutes;
