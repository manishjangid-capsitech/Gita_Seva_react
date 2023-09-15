import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../Contexts/UserContext";
import { AudioProvider } from "../Contexts/AudiosContext";
import AppRoutes from "./AppRoutes";
import HeaderPage from "./HeaderPage";
import PageFooter from "./FooterPage";
import React from "react";
import Loading from "../Components/Loading";
import { LocaleProvider } from "../Contexts/LocaleContext";
import AudioPlayer from "../Components/AudioPlayer";
import { CookiesProvider } from "react-cookie";
// const EpubPage = React.lazy(() => import("../Pages/Epub"));

function App(props: any) {
  return (
    <LocaleProvider>
      <CookiesProvider>
        <UserProvider>
          <React.Suspense fallback={<Loading />}>
            <BrowserRouter>
              <AudioProvider>
                {/* <React.Suspense fallback={<Loading />}> */}
                <>
                  <AppRoutes />
                  <AudioPlayer />
                </>

                {/* {window.location.pathname.substring(0, 14) == "/reader/books/" ? (
                <Routes>
                  <Route
                    element={<EpubPage />}
                    path='/reader/books/:id'></Route>
                </Routes>
              ) : (
                <AudioProvider>
                  <div>
                    <PageHeader />
                    <AppRoutes />
                  </div>
                  <AudioPlayer />
                  <PageFooter />
                </AudioProvider>
              )} */}
                {/* </React.Suspense> */}
              </AudioProvider>
            </BrowserRouter>
          </React.Suspense>
        </UserProvider>
      </CookiesProvider>
    </LocaleProvider>
  );
}

export default App;
