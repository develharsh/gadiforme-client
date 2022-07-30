import { useContext, useRef, useEffect } from "react";
import { DataContext } from "../../store/globalstate";
import { ACTIONS } from "../../store/actions";
import cookie from "js-cookie";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineLogout } from "react-icons/ai";

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
        className="sidepanel sidepanel-close"
        onClick={hideSidePanel}
        ref={sidepanelRef}
      >
        <div>
          <Link href="/add-trip">
            <a className="no-underline navcolour">Gadi`s for Your Trip</a>
          </Link>
        </div>
        <div>
          {user && (
            <Link href="/my-trips">
              <a className="no-underline navcolour">My Trips</a>
            </Link>
          )}
        </div>
        <div>
          <Link href="/about-us">
            <a className="no-underline navcolour">About Us</a>
          </Link>
        </div>
        <div>
          <Link href="https://blog.gadiforme.com">
            <a className="no-underline navcolour" target="_blank">
              FAQs
            </a>
          </Link>
        </div>
        <div>
          <Link href="https://partner.gadiforme.com">
            <a className="no-underline navcolour" target="_blank">
              Drive with us
            </a>
          </Link>
        </div>
        {user ? (
          <div>
            <Button
              colorScheme="red"
              onClick={logOutNow}
              leftIcon={<AiOutlineLogout />}
            >
              Log Out
            </Button>
          </div>
        ) : (
          <div>
            <Link href="#login">
              <a
                className="no-underline navcolour"
                onClick={() =>
                  dispatch({ type: ACTIONS.LOGIN_MODAL, payload: true })
                }
              >
                Log in
              </a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidepanel;
