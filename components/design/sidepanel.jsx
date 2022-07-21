import { useContext, useRef, useEffect } from "react";
import { DataContext } from "../../store/globalstate";
import { ACTIONS } from "../../store/actions";
import cookie from "js-cookie";
import { Button } from "primereact/button";
import Link from "next/link";

const Sidepanel = () => {
  const sidepanelRef = useRef(null);
  const { dispatch, state } = useContext(DataContext);
  const { user, sidepanel } = state;
  useEffect(() => {
    if (sidepanel) {
      sidepanelRef.current.classList.remove("sidepanel-close");
      sidepanelRef.current.classList.add("sidepanel-open");
    } else {
      sidepanelRef.current.classList.remove("sidepanel-open");
      sidepanelRef.current.classList.add("sidepanel-close");
    }
  }, [dispatch, sidepanel]);

  function logOutNow() {
    dispatch({ type: ACTIONS.AUTH, payload: null });
    cookie.remove("token");
    dispatch({
      type: ACTIONS.NOTIFY,
      payload: ["info", "Logged Out Successfully"],
    });
  }
  function hideSidePanel() {
    dispatch({ type: ACTIONS.SIDEPANEL, payload: false });
  }
  return (
    <>
      <div
        className="sidepanel shadow-5 sidepanel-close"
        onClick={hideSidePanel}
        ref={sidepanelRef}
      >
        <div>
          <Link href="/request-for-mock-interview">
            <a className="no-underline navcolour">Refer Me</a>
          </Link>
        </div>
        <div>
          <Link href="/pricing">
            <a className="no-underline navcolour">Pricing</a>
          </Link>
        </div>
        <div>
          <Link href="/faqs">
            <a className="no-underline navcolour">FAQs</a>
          </Link>
        </div>
        <div>
          <Link href="https://hire.morefined.com">
            <a className="no-underline navcolour">Hire with us</a>
          </Link>
        </div>
        {user ? (
          <div>
            <Button
              label="Log Out"
              onClick={logOutNow}
              className="p-button-rounded p-button-danger"
            />
          </div>
        ) : (
          <div>
            <Link href="/login">
              <a className="no-underline navcolour">Sign in</a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidepanel;
