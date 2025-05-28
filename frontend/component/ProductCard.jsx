import {
  useColorMode,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import "./ProductCard.scss";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import React, { useState } from "react";

export default function ProductCard({ product }) {
  const textColor = useColorMode().colorMode === "light" ? "black" : "white";
  const bg = useColorMode().colorMode === "light" ? "gray.300" : "gray.700";

  const toast = useToast();

  const { deleteProduct, updateProduct } = useProductStore();
  const handleDelete = async () => {
    const response = await deleteProduct(product._id);
    if (response.success) {
      toast({
        title: "Product Deleted",
        description: response.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed to delete product",
        description: response.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // for updating product details
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedProduct, setUpdateProduct] = useState(product);

  const handleUpdateProduct = async (id, updatedProduct) => {
    const {success, message} = await updateProduct(id, updatedProduct);   
    // close after update
    onClose();
    if (!success) {
      toast({
        title: "Failed to Update product",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Successfully Update product",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
  };

  return (
    <div className="ProductCard">
      <img
        src={product.image}
        alt={product.name}
        className="ProductCard__image"
      />
      <div className="ProductCard__bottom">
        <div className="ProductCard__bottom__details">
          <h3 className="ProductCard__bottom__details__name">{product.name}</h3>
          <p className="ProductCard__bottom__details__price">
            ${product.price.toFixed(2)}
          </p>
          <p className="ProductCard__bottom__details__description">
            {product.description}
          </p>
        </div>

        <div className="ProductCard__bottom__actions">
          <Button backgroundColor={bg} onClick={onOpen}>
            <EditIcon fontSize={20} />
          </Button>
          <Button
            backgroundColor={
              useColorMode().colorMode === "light" ? "red.400" : "red.700"
            }
            onClick={handleDelete}
          >
            <DeleteIcon fontSize={20} color={textColor} />
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Product Name"
              defaultValue={updatedProduct.name}
              mb={4}
              onChange={(e) =>
                setUpdateProduct({ ...updatedProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Product Price"
              defaultValue={updatedProduct.price}
              mb={4}
              type="number"
              onChange={(e) =>
                setUpdateProduct({ ...updatedProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Product Image URL"
              defaultValue={updatedProduct.image}
              mb={4}
              onChange={(e) =>
                setUpdateProduct({ ...updatedProduct, image: e.target.value })
              }
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
