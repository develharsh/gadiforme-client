import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/globalstate";
import { useRouter } from "next/router";
import { Input, FormControl, FormErrorMessage, Select } from "@chakra-ui/react";
import { State, City } from "country-state-city";

const ObjOfPayload = {
  Name: "",
  Phone: "",
  From: {
    State: "",
    City: "",
    Place: "",
  },
  To: {
    State: "",
    City: "",
    Place: "",
  },
  IsRoundTrip: false,
  when: "",
  ReturnTime: "",
  NoOfPerson: "",
  PreferredVehicles: [],
  Purpose: "",
  AnyMessage: "",
};

const Newtrip = () => {
  const router = useRouter();
  const { dispatch, state } = useContext(DataContext);
  const [payload, setPayload] = useState(ObjOfPayload);
  const [states, setStates] = useState([]);
  const [FromCities, setFromCities] = useState([]);
  const [ToCities, setToCities] = useState([]);
  const [errors, setErrors] = useState({
    Phone: "Phone Must Be A 10 Digit Number",
    Name: "Name is Missing",
    "From State": "Please Select State",
  });
  const handleNormChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
    delete errors[e.target.name];
    setErrors(errors);
  };
  const handleDeepChange = (value, Key, Type) => {
    payload[Type][Key] = value;
    setPayload(payload);
    delete errors[`${Type} ${Key}`];
    setErrors(errors);
  };
  const handleOneSelect = (value, Key, Type) => {
    payload[Type][Key] = value;
    delete errors[`${Type} ${Key}`];
    setErrors(errors);
    if (Key == "State") {
      payload[Type]["City"] = "";
      if (Type == "From")
        setFromCities(
          City.getCitiesOfState("IN", value).map((each) => {
            return { label: each.name, value: each.name };
          })
        );
      else
        setToCities(
          City.getCitiesOfState("IN", value).map((each) => {
            return { label: each.name, value: each.name };
          })
        );
    }
    setPayload(payload);
  };

  useEffect(() => {
    setStates(
      State.getStatesOfCountry("IN").map((each) => {
        return { label: each.name, value: each.isoCode };
      })
    );
  }, [states]);

  return (
    <>
      <div className="new-trip-main-div">
        <FormControl isInvalid={errors["Name"]} w="20rem">
          <Input
            name="Name"
            value={payload.Name}
            onChange={handleNormChange}
            type="text"
            placeholder="Your Name"
          />
          <FormErrorMessage>{errors["Name"]}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors["Phone"]} w="20rem">
          <Input
            name="Phone"
            value={payload.Phone}
            onChange={handleNormChange}
            type="number"
            placeholder="Your Phone"
          />
          <FormErrorMessage>{errors["Phone"]}</FormErrorMessage>
        </FormControl>
        <FormControl w="20rem" isInvalid={errors["From State"]}>
          <Select
            placeholder="From State"
            onChange={(e) => handleOneSelect(e.target.value, "State", "From")}
          >
            {states.map((each, idx) => (
              <option value={each.value} key={idx}>
                {each.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors["From State"]}</FormErrorMessage>
        </FormControl>
        <FormControl w="20rem">
          <Select
            placeholder="From City"
            onChange={(e) => handleOneSelect(e.target.value, "City", "From")}
          >
            {FromCities.map((each, idx) => (
              <option value={each.value} key={idx}>
                {each.label}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isInvalid={errors["From Place"]} w="20rem">
          <Input
            name="From Place"
            value={payload.From.Place}
            onChange={(e) => handleDeepChange(e.target.value, "Place", "From")}
            type="text"
            placeholder="From Place: House No., Sector/Colony"
          />
          <FormErrorMessage>{errors["Name"]}</FormErrorMessage>
        </FormControl>
        <FormControl w="20rem">
          <Select
            placeholder="To State"
            onChange={(e) => handleOneSelect(e.target.value, "State", "To")}
          >
            {states.map((each, idx) => (
              <option value={each.value} key={idx}>
                {each.label}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl w="20rem">
          <Select
            placeholder="To City"
            onChange={(e) => handleOneSelect(e.target.value, "City", "To")}
          >
            {ToCities.map((each, idx) => (
              <option value={each.value} key={idx}>
                {each.label}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isInvalid={errors["To Place"]} w="20rem">
          <Input
            name="To Place"
            value={payload.To.Place}
            onChange={(e) => handleDeepChange(e.target.value, "Place", "To")}
            type="text"
            placeholder="To Place: House No., Sector/Colony"
          />
          <FormErrorMessage>{errors["Name"]}</FormErrorMessage>
        </FormControl>
      </div>
    </>
  );
};

export default Newtrip;
