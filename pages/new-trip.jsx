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
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({
    Phone: "Phone Must Be A 10 Digit Number",
    Name: "Name is Missing",
  });
  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
    delete errors[e.target.name];
    setErrors(errors);
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
            onChange={handleChange}
            type="text"
            placeholder="Your Name"
          />
          <FormErrorMessage>{errors["Name"]}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors["Phone"]} w="20rem">
          <Input
            name="Phone"
            value={payload.Phone}
            onChange={handleChange}
            type="number"
            placeholder="Your Phone"
          />
          <FormErrorMessage>{errors["Phone"]}</FormErrorMessage>
        </FormControl>
        <FormControl w="20rem">
          <Select
            placeholder="From State"
            name="From.State"
            onChange={handleSwitch}
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
            placeholder="From City"
            name="From.City"
            onChange={handleSwitch}
          >
            {cities.map((each, idx) => (
              <option value={each.value} key={idx}>
                {each.label}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default Newtrip;
