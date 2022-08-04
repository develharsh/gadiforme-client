import Head from "next/head";

import {
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
const Faqs = () => {
  return (
    <>
      <Head>
        <title>Frequently Asked Questions - www.gadiforme.com</title>
      </Head>
      <Text fontSize="5xl" textAlign={"center"} my="2rem" color="#000">
        Frequently Asked Questions - FAQs
      </Text>
      <div className="faqs">
        <Accordion>
          <AccordComp
            heading={"Do I need to register on your site to book tickets?"}
            text="No. You can use our service fully without the need to register. You just need to provide your details at the time of booking."
          />
          <AccordComp
            heading={"Cancellation & Refund Policy"}
            text="If You Cancel the Trip, then, The Advance Payment will not be refunded. But, If Trip Partner cancels the Trip, then Advance Payment will be redunded immediately."
          />
        </Accordion>
      </div>
    </>
  );
};

const AccordComp = ({ heading, text }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {heading}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{text}</AccordionPanel>
    </AccordionItem>
  );
};

export default Faqs;
