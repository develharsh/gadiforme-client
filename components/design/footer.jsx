import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";

const Logo = () => {
  return (
    <Flex gap={2} align={"center"}>
      <img
        src="/assets/logomain.png"
        alt="logo-gadiforme.com"
        className="footer-logo"
      />
      <p>Best Car Finder for Your Trip</p>
    </Flex>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithLogoLeft() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Logo color={useColorModeValue("gray.700", "white")} />
            </Box>
            <Text fontSize={"sm"}>
              © 2020 GadiForMe Inc. All rights reserved
            </Text>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Services</ListHeader>
            <Link href={"https://partner.gadiforme.com"} target="_blank">
              Drive With Us
            </Link>
            <Link href={"/new-trip"}>Gadis for Your Trip</Link>
            <Link href={"/new-trip"}>Private Cars</Link>
            <Link href={"/new-trip"}>Luxury Cars</Link>
            <Link href={"/new-trip"}>Buses</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link href={"/about-us"}>About Us</Link>
            <Link href={"/frequently-asked-questions-faqs"}>FAQs</Link>
            <Link href={"/careers"}>Careers</Link>
            <Link href={"/about-us"}>Our Mission</Link>
            <Link href={"/about-us"}>Contact</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link href={"/about-us"}>Help Center</Link>
            <Link href={"/terms-and-conditions"}>Terms &amp; Conditions</Link>
            <Link
              target="_blank"
              href={
                "https://www.startupindia.gov.in/content/sih/en/profile.Startup.614f607ae4b05667f116a1ed.html"
              }
            >
              Legal
            </Link>
            <Link href={"/privacy-policy"}>Privacy Policy</Link>
            <Link href={"/about-us"}>Emergency</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Follow Us</ListHeader>
            <Link href={"#"}>Facebook</Link>
            <Link href={"#"}>Twitter</Link>
            <Link href={"#"}>WhatsApp</Link>
            <Link href={"#"}>Instagram</Link>
            <Link href={"#"}>LinkedIn</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
