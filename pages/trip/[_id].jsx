import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../store/globalstate";
import { ACTIONS, viewTrip } from "../../store/actions";
import { useRouter } from "next/router";
import { Text, Spinner } from "@chakra-ui/react";
import { State } from "country-state-city";
import moment from "moment";

const View = () => {
  const router = useRouter();
  const { _id } = router.query;
  const { dispatch } = useContext(DataContext);
  const [trip, setTrip] = useState(null);
  useEffect(() => {
    if (_id && !trip) {
      viewTrip(_id).then((resp) => {
        if (resp.success) setTrip(resp.trip);
        else {
          dispatch({ type: ACTIONS.NOTIFY, payload: ["error", resp.message] });
          router.push("/");
        }
      });
    }
  }, [_id, trip]);
  return (
    <>
      <Text fontSize="5xl" textAlign={"center"} mt="2rem" color="#ED64A6">
        Trip Details- GadiForMe Inc.
      </Text>
      <Text fontSize="2xl" textAlign={"center"} my="0.5rem">
        Thanks for Choosing Us:)
      </Text>
      {trip ? <DetailsComp data={trip} /> : <Spinner size="lg" />}
    </>
  );
};

const DetailsComp = ({ data }) => {
  return (
    <div>
      <img src={data.Client.Id.Image} alt="Client Image" />
      <p>Name: {data.Client.Name}</p>
      <p>
        Phone: {data.Client.PhoneExt} {data.Client.Phone}
      </p>

      <p>
        Pickup: {data.From.Place} __ {data.From.City}
        {" __ "}
        {State.getStateByCodeAndCountry(data.From.State, "IN").name}
      </p>
      <p>
        Dropoff: {data.To.Place} __ {data.To.City}
        {" __ "}
        {State.getStateByCodeAndCountry(data.To.State, "IN").name}
      </p>

      <p>Round Trip? : {data.IsRoundTrip ? "Yes" : "No"}</p>
      <p>
        Pickup Date &amp; Time:{" "}
        {moment(data.When).format("dddd DD MMM YYYY, hh:mm A")}
      </p>
      {data.IsRoundTrip && (
        <p>
          Return Date &amp; Time:{" "}
          {moment(data.ReturnTime).format("dddd DD MMM YYYY, hh:mm A")}
        </p>
      )}
      <p>Vehicle: {data.Vehicle.Title}</p>

      <img src={data.Partner.Id.Image} alt="Partner Image" />
      <p>Name: {data.Partner.Name}</p>
      <p>
        Phone: {data.Partner.PhoneExt} {data.Partner.Phone}
      </p>
    </div>
  );
};

export default View;
