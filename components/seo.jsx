import Head from "next/head";

const Seo = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/assets/logomain.png" />
      {/* <meta name="theme-color" content="purple" /> */}
      <meta
        name="description"
        content="GadiForMe - India's Leading Cabs &amp; Private Car Provider. Get Fare Estimates for Free. We focus on convenience, safety &amp; affordability. Book Your Cab Now."
      />
      <meta name="lang" content="en" />
      <meta
        name="keywords"
        content="GadiForMe, Gadiforme, www.gadifor.me, gadifor.me, Cabs, Private Cars, Taxi, Rental Cars."
      />
    </Head>
  );
};

export default Seo;
