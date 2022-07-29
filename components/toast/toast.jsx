// import {  } from "react";
import { useRef, useContext, useEffect } from "react";
import { DataContext } from "../../store/globalstate";
import { ACTIONS } from "../../store/actions";
import { useToast } from "@chakra-ui/react";
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ5N2E4ZDExZWM1N2FlNTVhODFkOTIiLCJpYXQiOjE2NTkxMTAyNjUsImV4cCI6MTY1OTU0MjI2NX0.UT1X037VeeTFwH6_yiLq_LwAIt68E6ihAgrQbyMLpyc

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
