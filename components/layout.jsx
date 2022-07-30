import Head from "next/head";
import Navbar from "./design/navbar";
import Footer from "./design/footer";
// import GlobalLoading from "./design/globalloading";
import Sidepanel from "./design/sidepanel";
import Login from "./auth/login";
import Register from "./auth/register";
import Toast from "./toast/toast";

// import { useContext } from "react";
// import { DataContext } from "../store/globalstate";
import Router from "next/router";
// import Information from "./design/information";
// import { ACTIONS } from "../store/actions";

function layout({ children }) {
  // const { dispatch } = useContext(DataContext);
  Router.events.on("routeChangeStart", (url) => {
    // dispatch({ type: ACTIONS.GLOBAL_LOADING, payload: true });
  });
  Router.events.on("routeChangeComplete", (url) => {
    // dispatch({ type: ACTIONS.GLOBAL_LOADING, payload: false });
  });
  return (
    <>
      <Head>
        {/* <link rel="shortcut icon" href="/logosm2.png" type="image/x-icon" /> */}
      </Head>
      <Navbar />
      {/* <Information /> */}
      {/* <GlobalLoading /> */}
      {<Login />}
      {<Register />}
      {<Sidepanel />}
      <Toast />
      {/* <Loading show={routeChanged} /> */}
      {children}
      <Footer />
    </>
  );
}

export default layout;
