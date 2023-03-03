import { Inter } from "next/font/google";
import { Heading } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

const HomePage = () => {
  return (
    <div>
      <Heading>Hello Next!</Heading>
    </div>
  );
};

export default HomePage;
