import { useContext, useEffect, useState } from "react";
import { DataContext } from "../store/globalstate";
import { ACTIONS, myTrips } from "../store/actions";
import cookie from "js-cookie";
import { Spinner } from "@chakra-ui/react";
import TripCard from "../components/trip/tripcard";

const Mytrips = () => {
  const { dispatch } = useContext(DataContext);
  const [trips, setTrips] = useState(null);
  useEffect(() => {
    if (!trips) {
      const token = cookie.get("token");
      myTrips(token).then((resp) => {
        if (resp.success) setTrips(resp.trips);
        else {
          dispatch({
            type: ACTIONS.NOTIFY,
            payload: ["error", resp.message],
          });
        }
      });
    }
  }, [dispatch, trips]);

  return (
    <>
      <h1>Harsh</h1>
      {trips ? (
        trips.length ? (
          trips.map((trip, idx) => <TripCard details={trip} />)
        ) : (
          <h1>You have'nt travelled yet with us</h1>
        )
      ) : (
        <Spinner size="lg" color="#3b82f6" />
      )}
    </>
  );
};

// export async function getServerSideProps(context) {
//   const { req, res } = context;
//   const token = req.cookies.token;
//   if (token) {
//     try {
//       await axios({
//         method: "GET",
//         url: `${process.env.baseUrl}/v1/user/load`,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     } catch (err) {
//       res.setHeader(...deleteCookies(["token"]));
//       return Redirect("/");
//     }
//   } else return Redirect("/");

//   return { props: {} };
// }

export default Mytrips;
