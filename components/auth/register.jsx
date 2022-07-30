import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../store/globalstate";
import { ACTIONS, userRegister } from "../../store/actions";
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
import { MdAppRegistration } from "react-icons/md";
import $ from "jquery";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { dispatch, state } = useContext(DataContext);
  const { registerModal } = state;
  const [payload, setPayload] = useState({
    phone: "",
    password: "",
    role: "Client",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (registerModal) onOpen();
    else onClose();
  }, [registerModal]);

  const toggleRegisterModal = () => {
    dispatch({ type: ACTIONS.REGISTER_MODAL, payload: !registerModal });
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
    const response = await userRegister(payload);
    setIsLoading(false);
    const { success, token, message, user } = response;
    if (success && token && message && user) {
      cookie.set("token", token);
      dispatch({ type: ACTIONS.NOTIFY, payload: ["success", message] });
      dispatch({ type: ACTIONS.AUTH, payload: user });
      toggleRegisterModal();
    } else {
      dispatch({
        type: ACTIONS.NOTIFY,
        payload: ["error", response.message],
      });
    }
  };

  const switchToLogin = () => {
    dispatch({ type: ACTIONS.REGISTER_MODAL, payload: false });
    dispatch({ type: ACTIONS.LOGIN_MODAL, payload: true });
    router.push(window.location.href.replace(/#.*/, "#login"));
  };

  return (
    <Modal isOpen={isOpen} onClose={toggleRegisterModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Register - New Account</ModalHeader>
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
            bg="tomato"
            color="#fff"
            onClick={switchToLogin}
            _hover={{
              color: "#fff",
              background: "tomato",
            }}
          >
            Already a User?
          </Button>
          <Button
            bg="darkblue"
            color="#fff"
            leftIcon={<MdAppRegistration />}
            onClick={handleSubmit}
            _hover={{
              color: "#fff",
              background: "darkblue",
            }}
          >
            Register
          </Button>
          <Button
            onClick={toggleRegisterModal}
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

export default Register;
