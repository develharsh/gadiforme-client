import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/globalstate";
import { ACTIONS, newTrip } from "../store/actions";
import { useRouter } from "next/router";
import {
  Input,
  FormControl,
  FormErrorMessage,
  Select,
  Checkbox,
  FormLabel,
  InputLeftAddon,
  InputGroup,
  Textarea,
  Button,
  Spinner,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { State, City } from "country-state-city";
import $ from "jquery";
import { ArrowForwardIcon, InfoIcon } from "@chakra-ui/icons";

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
  When: "",
  ReturnTime: "",
  NoOfPerson: "",
  Purpose: "",
  AnyMessage: "",
};

const Newtrip = () => {
  const router = useRouter();
  const { dispatch } = useContext(DataContext);
  const [payload, setPayload] = useState(ObjOfPayload);
  const [states, setStates] = useState([]);
  const [FromCities, setFromCities] = useState([]);
  const [ToCities, setToCities] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleNormChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
    delete errors[e.target.name];
    setErrors(errors);
  };
  const handleDeepChange = (value, Key, Type) => {
    payload[Type][Key] = value;
    setPayload({ ...payload });
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
    if (states?.length == 0)
      setStates(
        State.getStatesOfCountry("IN").map((each) => {
          return { label: each.name, value: each.isoCode };
        })
      );
  }, [states]);

  const handleSubmit = async () => {
    let invalidations = {};
    invalidations = validatePayload(invalidations, payload);
    if ($.isEmptyObject(invalidations)) setErrors({});
    else {
      setErrors(invalidations);
      dispatch({
        type: ACTIONS.NOTIFY,
        payload: ["warning", "Please Resolve Above Errors"],
      });
      return;
    }
    setIsLoading(true);
    const response = await newTrip(payload);
    setIsLoading(false);
    const { success, message, trip } = response;
    if (success && message && trip) {
      router.push("/");
      dispatch({ type: ACTIONS.NOTIFY, payload: ["success", message] });
      setTimeout(() => {
        window.open(
          `https://wa.me/+918077015752?text=Hey%20GadiForMe,%0APlease%20Review%20My%20Trip:%20${trip}`,
          "_blank"
        );
      }, 3000);
    } else {
      dispatch({
        type: ACTIONS.NOTIFY,
        payload: ["error", response.message],
      });
    }
  };

  return (
    <>
      <Text fontSize="5xl" textAlign={"center"} my="2rem" color="#ED64A6">
        Add Trip Details to Get List of Available Cabs
      </Text>
      <div className="new-trip-main-div">
        <FormControl isInvalid={errors["Name"]} w="20rem">
          <FormLabel display="flex" gap="1rem">
            <span className="red">*</span> Your Name
          </FormLabel>
          <Input
            name="Name"
            value={payload.Name}
            onChange={handleNormChange}
            type="text"
          />
          <FormErrorMessage>{errors["Name"]}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors["Phone"]} w="20rem">
          <Tooltip label="WhatsApp No. Preferred for Sending Details" hasArrow>
            <FormLabel display="flex" gap="1rem">
              <span className="red">*</span> Your WhatsApp No.
              <InfoIcon />
            </FormLabel>
          </Tooltip>
          <InputGroup>
            <InputLeftAddon>+91</InputLeftAddon>
            <Input
              name="Phone"
              value={payload.Phone}
              onChange={handleNormChange}
              type="number"
              maxLength={10}
            />
          </InputGroup>
          <FormErrorMessage>{errors["Phone"]}</FormErrorMessage>
        </FormControl>
        <FormControl w="20rem" isInvalid={errors["From State"]}>
          <Tooltip label="State, You will leave from" hasArrow>
            <FormLabel display="flex" gap="1rem">
              <span className="red">*</span> From State
              <InfoIcon />
            </FormLabel>
          </Tooltip>
          <Select
            placeholder="Click to Select"
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
        <FormControl w="20rem" isInvalid={errors["From City"]}>
          <Tooltip label="City, You will leave from" hasArrow>
            <FormLabel display="flex" gap="1rem">
              <span className="red">*</span> From City
              <InfoIcon />
            </FormLabel>
          </Tooltip>
          <Select
            placeholder="Click to Select"
            onChange={(e) => handleOneSelect(e.target.value, "City", "From")}
          >
            {FromCities.map((each, idx) => (
              <option value={each.value} key={idx}>
                {each.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors["From City"]}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors["From Place"]} w="20rem">
          <Tooltip label="House No., Building, Sector/Colony" hasArrow>
            <FormLabel display="flex" gap="1rem">
              <span className="red">*</span> From Place(Pickup Location)
              <InfoIcon />
            </FormLabel>
          </Tooltip>
          <Input
            name="From Place"
            value={payload.From.Place}
            onChange={(e) => handleDeepChange(e.target.value, "Place", "From")}
            type="text"
          />
          <FormErrorMessage>{errors["From Place"]}</FormErrorMessage>
        </FormControl>
        <FormControl w="20rem" isInvalid={errors["To State"]}>
          <Tooltip label="State, your destination is there" hasArrow>
            <FormLabel display="flex" gap="1rem">
              <span className="red">*</span> To State
              <InfoIcon />
            </FormLabel>
          </Tooltip>
          <Select
            placeholder="Click to Select"
            onChange={(e) => handleOneSelect(e.target.value, "State", "To")}
          >
            {states.map((each, idx) => (
              <option value={each.value} key={idx}>
                {each.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors["To State"]}</FormErrorMessage>
        </FormControl>
        <FormControl w="20rem" isInvalid={errors["To City"]}>
          <Tooltip label="City, your destination is there" hasArrow>
            <FormLabel display="flex" gap="1rem">
              <span className="red">*</span> To City
              <InfoIcon />
            </FormLabel>
          </Tooltip>
          <Select
            placeholder="Click to Select"
            onChange={(e) => handleOneSelect(e.target.value, "City", "To")}
          >
            {ToCities.map((each, idx) => (
              <option value={each.value} key={idx}>
                {each.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors["To City"]}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors["To Place"]} w="20rem">
          <Tooltip label="Building/House/Station..." hasArrow>
            <FormLabel display="flex" gap="1rem">
              <span className="red">*</span> To Place(Destination Location)
              <InfoIcon />
            </FormLabel>
          </Tooltip>
          <Input
            name="To Place"
            value={payload.To.Place}
            onChange={(e) => handleDeepChange(e.target.value, "Place", "To")}
            type="text"
          />
          <FormErrorMessage>{errors["To Place"]}</FormErrorMessage>
        </FormControl>
        <FormControl w="20rem">
          <Tooltip label="Will you return with us for sure?" hasArrow>
            <FormLabel display="flex" gap="1rem">
              Is Round Trip?
              <InfoIcon />
            </FormLabel>
          </Tooltip>
          <Checkbox
            onChange={(e) =>
              setPayload({
                ...payload,
                IsRoundTrip: e.target.checked,
                ReturnTime: "",
              })
            }
          >
            Yes
          </Checkbox>
        </FormControl>
        <FormControl w="20rem" isInvalid={errors["When"]}>
          <FormLabel display="flex" gap="1rem">
            <span className="red">*</span> When to Start Trip
          </FormLabel>
          <Input
            name="When"
            value={payload.When}
            onChange={handleNormChange}
            type="datetime-local"
          />
          <FormErrorMessage>{errors["When"]}</FormErrorMessage>
        </FormControl>
        {payload.IsRoundTrip && (
          <FormControl w="20rem" isInvalid={errors["ReturnTime"]}>
            <Tooltip label="When Driver Can start returning" hasArrow>
              <FormLabel display="flex" gap="1rem">
                <span className="red">*</span> When to Return
                <InfoIcon />
              </FormLabel>
            </Tooltip>
            <Input
              name="ReturnTime"
              value={payload.ReturnTime}
              onChange={handleNormChange}
              type="datetime-local"
            />
            <FormErrorMessage>{errors["ReturnTime"]}</FormErrorMessage>
          </FormControl>
        )}
        <FormControl isInvalid={errors["NoOfPerson"]} w="20rem">
          <FormLabel display="flex" gap="1rem">
            <span className="red">*</span> No. of Person
          </FormLabel>
          <Input
            name="NoOfPerson"
            value={payload.NoOfPerson}
            onChange={handleNormChange}
            type="number"
          />
          <FormErrorMessage>{errors["NoOfPerson"]}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors["Purpose"]} w="20rem">
          <FormLabel display="flex" gap="1rem">
            <span className="red">*</span> Purpose of Trip
          </FormLabel>
          <Textarea
            name="Purpose"
            value={payload.Purpose}
            onChange={handleNormChange}
            type="text"
          />
          <FormErrorMessage>{errors["Purpose"]}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors["AnyMessage"]} w="20rem">
          <FormLabel display="flex" gap="1rem">
            Any Message for Us?
          </FormLabel>
          <Textarea
            name="AnyMessage"
            value={payload.AnyMessage}
            onChange={handleNormChange}
            placeholder="For Example: 3 Bags, etc..."
            type="text"
          />
          <FormErrorMessage>{errors["NoOfPerson"]}</FormErrorMessage>
        </FormControl>
        <FormControl w="20rem">
          {isLoading && <Spinner mr="1rem" />}
          <Button
            colorScheme="purple"
            onClick={handleSubmit}
            leftIcon={<ArrowForwardIcon />}
          >
            Submit
          </Button>
        </FormControl>
      </div>
    </>
  );
};

const validatePayload = (invalidations, payload) => {
  if (!payload.Name) invalidations.Name = "Name is missing";
  if (!payload.Phone) invalidations.Phone = "Phone is missing";
  if (!invalidations.Phone && payload.Phone.length != 10)
    invalidations.Phone = "Phone must be 10 Digit Long";

  if (!payload.From.State) invalidations["From State"] = "Please Select State";
  if (!payload.From.City) invalidations["From City"] = "Please Select City";
  if (!payload.From.Place) invalidations["From Place"] = "Please Select Place";
  if (!payload.To.State) invalidations["To State"] = "Please Select State";
  if (!payload.To.City) invalidations["To City"] = "Please Select City";
  if (!payload.To.Place) invalidations["To Place"] = "Please Select Place";

  if (!payload.When) invalidations.When = "Please Choose Date & Time";
  if (payload.IsRoundTrip && !payload.ReturnTime)
    invalidations.ReturnTime = "Please Choose Date & Time";
  if (!payload.NoOfPerson || payload.NoOfPerson <= 0)
    invalidations.NoOfPerson = "Please Add No. of Person";
  if (!payload.Purpose) invalidations.Purpose = "Purpose is missing";
  return invalidations;
};

export default Newtrip;
