import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../store/globalstate";
import { ACTIONS } from "../../store/actions";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import $ from "jquery";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { dispatch, state } = useContext(DataContext);
  const { loginModal } = state;
  const [payload, setPayload] = useState({
    phone: "",
    password: "",
    role: "Client",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loginModal) onOpen();
    else onClose();
  }, [loginModal]);

  const toggleLoginModal = () => {
    dispatch({ type: ACTIONS.LOGIN_MODAL, payload: !loginModal });
    router.push(window.location.href.replace(/#.*/, ""));
  };

  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
    delete errors[e.target.name];
    setErrors(errors);
  };

  const handleSubmit = async () => {
    let invalidations = {};
    if (!payload.phone) invalidations["phone"] = true;
    if (!payload.password) invalidations["password"] = true;
    if ($.isEmptyObject(invalidations)) setErrors({});
    else return setErrors(invalidations);
    setIsLoading(true);
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.baseUrl}/v1/user/login`,
        data: payload,
      });
      setIsLoading(false);
      const { success, token, message, user } = response.data;
      if (success && token && message && user) {
        cookie.set("token", token);
        dispatch({ type: ACTIONS.NOTIFY, payload: ["success", message] });
        dispatch({ type: ACTIONS.AUTH, payload: user });
        toggleLoginModal();
      }
    } catch (err) {
      setIsLoading(false);
      dispatch({
        type: ACTIONS.NOTIFY,
        payload: ["error", err.response.data.message],
      });
    }
  };

  const switchToRegister = () => {
    dispatch({ type: ACTIONS.LOGIN_MODAL, payload: false });
    dispatch({ type: ACTIONS.REGISTER_MODAL, payload: true });
    router.push(window.location.href.replace(/#.*/, "#register"));
  };

  return (
    <Modal isOpen={isOpen} onClose={toggleLoginModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log In</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Your Phone</FormLabel>
            <Input
              isInvalid={errors["phone"]}
              name="phone"
              value={payload.phone}
              onChange={handleChange}
              type="number"
              placeholder="Enter Your 10 Digit Phone Number"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Your Password</FormLabel>
            <Input
              isInvalid={errors["password"]}
              name="password"
              value={payload.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter Your Password"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter display="flex" justifyContent="space-between" gap={1}>
          {isLoading && <Spinner />}
          <Button
            bg="#ab47bc"
            color="#fff"
            onClick={switchToRegister}
            _hover={{
              bg: "#ab47bc",
              color: "#fff",
            }}
          >
            New User?
          </Button>
          <Button
            colorScheme="blue"
            leftIcon={<AiOutlineLogin />}
            onClick={handleSubmit}
          >
            Log In
          </Button>
          <Button
            onClick={toggleLoginModal}
            leftIcon={<FaTimes />}
            colorScheme="red"
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Login;
