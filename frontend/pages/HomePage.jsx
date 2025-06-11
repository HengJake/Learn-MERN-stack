import React from "react";
import {
  Container,
  VStack,
  Text,
  SimpleGrid,
  Link,
  useDisclosure,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useProductStore } from "../store/product"; // Adjust the import path as necessary
import { useEffect } from "react";
import ProductCard from "../component/ProductCard"; // Adjust the import path as necessary

function HomePage() {
  const { getProducts, products } = useProductStore();
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products 🚀
        </Text>

        {products.length === 0 ? (
          <Text fontSize={"20"} fontWeight={"medium"} color={"gray.500"}>
            Seems like you don't have any products yet. <br />
            <Link
              href="/create"
              color={"blue.500"}
              textDecoration={"underline"}
            >
              Create New Product
            </Link>
          </Text>
        ) : (
          <SimpleGrid columns={3} spacing={5}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
}

export default HomePage;
