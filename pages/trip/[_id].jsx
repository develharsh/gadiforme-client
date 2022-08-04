import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../store/globalstate";
import { ACTIONS, viewTrip } from "../../store/actions";
import { useRouter } from "next/router";
import { Text, Spinner } from "@chakra-ui/react";
import { State } from "country-state-city";
import moment from "moment";
import { PhoneIcon } from "@chakra-ui/icons";
import Head from "next/head";

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
      <Head>
        <title>My Trip Details - www.gadiforme.com</title>
      </Head>
      <div style={{ marginBottom: "10vh" }}>
        <Text fontSize="5xl" textAlign={"center"} mt="2rem" color="#ED64A6">
          Trip Details- GadiForMe Inc.
        </Text>
        <Text fontSize="2xl" textAlign={"center"} my="0.5rem">
          Thanks for Choosing Us:)
        </Text>
        <div className="trip_id_first_tile">
          <img
            src="/assets/gadiforme-com-trip-background.jpg"
            alt="gadiforme-com-trip-background.jpg"
          />
        </div>
        {trip ? (
          <DetailsComp data={trip} />
        ) : (
          <div className="trip_id_spinner">
            <Spinner size="lg" color="#ED64A6" />
          </div>
        )}
      </div>
    </>
  );
};

const DetailsComp = ({ data }) => {
  return (
    <div className="trip_id_details_div">
      <div>
        <img
          src={data.Client.Id.Image}
          alt="Client Image"
          className="trip_id_client_id"
        />
      </div>
      <div>
        <p>
          <span>Client&apos;s Name:</span>
          <br></br>
          <span>{data.Client.Name}</span>
        </p>
      </div>
      <div>
        <p>
          <span>Client&apos;s Phone:</span>
          <br></br>
          <a href={`tel:${data.Client.PhoneExt}${data.Client.Phone}`}>
            <PhoneIcon /> {data.Client.PhoneExt} {data.Client.Phone}
          </a>
        </p>
      </div>

      <div>
        <p>
          <span>Pickup:</span>
          <br></br>
          <span>
            {data.From.Place} __ {data.From.City}
            {" __ "}
            {State.getStateByCodeAndCountry(data.From.State, "IN").name}
          </span>
        </p>
      </div>
      <div>
        <p>
          <span>Dropoff:</span>
          <br></br>
          <span>
            {data.To.Place} __ {data.To.City}
            {" __ "}
            {State.getStateByCodeAndCountry(data.To.State, "IN").name}
          </span>
        </p>
      </div>

      <div>
        <p>
          <span>Round Trip?:</span>
          <br></br>
          <span>{data.IsRoundTrip ? "Yes" : "No"}</span>
        </p>
      </div>
      <div>
        <p>
          <span>Pickup Date &amp; Time:</span>
          <br></br>
          <span>{moment(data.When).format("dddd DD MMM YYYY, hh:mm A")}</span>
        </p>
      </div>
      {data.IsRoundTrip && (
        <div>
          <p>
            <span>Return Date &amp; Time:</span>
            <br></br>
            <span>
              {moment(data.ReturnTime).format("dddd DD MMM YYYY, hh:mm A")}
            </span>
          </p>
        </div>
      )}
      <div>
        <p>
          <span>Vehicle:</span>
          <br></br>
          <span>{data.Vehicle.Title}</span>
        </p>
      </div>
      <div>
        <p>
          <span>Registration No.:</span>
          <br></br>
          <span>{data.Vehicle.RegistrationNo}</span>
        </p>
      </div>
      <div>
        <p>
          <span>Total Cost:</span>
          <br></br>
          <span>₹ {data.TotalCost}</span>
        </p>
      </div>
      <div>
        <p>
          <span>Advance Paid:</span>
          <br></br>
          <span>₹ {data.AdvancePaid}</span>
        </p>
      </div>
      <div>
        <p>
          <span>No. of Person:</span>
          <br></br>
          <span>{data.NoOfPerson}</span>
        </p>
      </div>
      <div>
        <p>
          <span>Purpose:</span>
          <br></br>
          <span>{data.Purpose}</span>
        </p>
      </div>
      <div>
        <p>
          <span>Message:</span>
          <br></br>
          <span>{data.AnyMessage}</span>
        </p>
      </div>

      <div>
        <img
          src={data.Partner.Id.Image}
          alt="Partner Image"
          className="trip_id_partner_id"
        />
      </div>
      <div>
        <p>
          <span>Trip Partner&apos;s Name:</span>
          <br></br>
          <span>{data.Partner.Name}</span>
        </p>
      </div>
      <div>
        <p>
          <span>Trip Partner&apos;s Phone:</span>
          <br></br>
          <a href={`tel:${data.Partner.PhoneExt}${data.Partner.Phone}`}>
            <PhoneIcon /> {data.Partner.PhoneExt} {data.Partner.Phone}
          </a>
        </p>
      </div>
    </div>
  );
};

export default View;
