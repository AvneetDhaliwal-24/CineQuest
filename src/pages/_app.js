import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"
import '../styles/gallery.css'; 

import Layout from "./navbarfootergloballayout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
