import { useContext } from "react";
import { DataContext } from "../store/globalstate";

const Profile = () => {
  const { state } = useContext(DataContext);
  return <>{state.user?.user?.phone} {state.user?.user?.role}</>;
};

export default Profile;
