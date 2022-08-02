import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Trip made{" "}
          <Text as={"span"} color={"orange.400"}>
            Convenient, Safe &amp; Affordable
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Avoid the Hefty Charges of Other Cabs.<br></br>Select from the Fleet
          &amp; Filter as per your convenience.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            rounded={"full"}
            px={6}
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.500" }}
          >
            I want a Car
          </Button>
          <Button
            rounded={"full"}
            px={6}
            onClick={() => router.push(`/trip/${prompt("Enter Trip No.")}`)}
          >
            My Trip Details
          </Button>
        </Stack>
        <Flex
          w={"full"}
          justifyContent="space-evenly"
          alignItems={"center"}
          flexWrap="wrap"
          gap="2rem"
          boxShadow={"xl"}
          p={5}
        >
          <div className="home_tile_1">
            <img src="/assets/gadiforme-com-happy-tile.jpg" alt="" />
          </div>
          <div>
            <p className="home_text_1">Cabs At Just One Click</p>
          </div>
        </Flex>
      </Stack>
    </Container>
  );
}
