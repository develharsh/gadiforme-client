// import {  } from "react";
import { useContext, useEffect } from "react";
import { DataContext } from "../../store/globalstate";
import { ACTIONS } from "../../store/actions";
import { useToast } from "@chakra-ui/react";

function ToastC() {
  const toast = useToast();
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;
  useEffect(() => {
    if (notify) {
      toast({
        title: `${notify[1]}`,
        status: notify[0],
        isClosable: true,
      });
      setTimeout(() => {
        dispatch({ type: ACTIONS.NOTIFY, payload: null });
      }, 3000);
    }
  }, [dispatch, notify]);

  return <>{/* <Toast ref={toast} /> */}</>;
}

export default ToastC;
