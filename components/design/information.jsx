import { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
const Information = () => {
  const [showInfo, setInfo] = useState(false);
  useEffect(() => {
    getInformation();
  }, []);

  const getInformation = () => {
    // debugger;
    const infoHidden = localStorage.getItem("infoHidden");
    if (!infoHidden) {
      setInfo(true);
    } else {
      try {
        // debugger;
        if (moment(new Date()).diff(infoHidden, "day") == 0) {
          //   debugger;
        } else {
          //   debugger;
          setInfo(true);
          localStorage.removeItem("infoHidden");
        }
      } catch (err) {
        // debugger;
        localStorage.removeItem("infoHidden");
      }
    }
  };

  const toggleInformation = () => {
    localStorage.setItem("infoHidden", new Date());
    setInfo(false);
  };

  return (
    <>
      {showInfo && (
        <div className="bg-bluegray-900 text-gray-100 p-3 flex justify-content-between justify-content-center align-items-center flex-wrap">
          <div className="font-bold mr-8">🔥 Hurry up!</div>
          <div className="align-items-center flex">
            <span className="line-height-3">
              Free Referral Program till {process.env.business.referralDate}.
              Register before {process.env.business.referralDate} to get a free
              referral.
            </span>
          </div>
          <Link href="/request-for-mock-interview">
            <a className="flex align-items-center ml-2 mr-8 text-white">
              <span className="underline font-bold">Learn More</span>
            </a>
          </Link>
          <a
            className="flex align-items-center no-underline justify-content-center border-circle text-100 hover:bg-bluegray-700 cursor-pointer transition-colors transition-duration-150"
            style={{ width: "2rem", height: "2rem" }}
          >
            <i className="pi pi-times" onClick={toggleInformation}></i>
          </a>
        </div>
      )}
    </>
  );
};

export default Information;
