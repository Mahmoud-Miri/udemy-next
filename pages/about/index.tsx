import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

type ColorPickerProps = {
  label: string;
};

const ColorPicker: React.FC<ColorPickerProps> = ({ label }) => {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [previousColor, setPreviousColor] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
  };

  const handleColorPickerOpen = () => {
    setPreviousColor(selectedColor);
    onOpen();
  };

  const handleColorPickerClose = () => {
    setSelectedColor(previousColor);
    onClose();
  };

  const handleColorSelect = () => {
    setPreviousColor(selectedColor);
    onClose();
  };

  return (
    <Box m={5}>
      <FormControl id="colorPicker">
        <FormLabel>{label}</FormLabel>
        <Flex alignItems="center">
          <Text mr={5}>Foo</Text>
          <Button
            size="md"
            backgroundColor={selectedColor}
            onClick={handleColorPickerOpen}
            borderRadius="full"
            _hover={{ background: selectedColor }}
          />
        </Flex>
      </FormControl>

      <Modal isOpen={isOpen} onClose={handleColorPickerClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pb={1}>Select Color</ModalHeader>
          <ModalCloseButton />
          <Divider mb={4} />
          <ModalBody>
            <Flex flexDirection="row">
              <Input
                type="color"
                value={selectedColor}
                onChange={handleColorChange}
                mr={4}
              />
              <Input
                placeholder="Hex color value"
                value={selectedColor}
                onChange={handleColorChange}
              />
            </Flex>
          </ModalBody>
          <Divider mt={4} />
          <ModalFooter>
            <Flex justifyContent="flex-end">
              <Button colorScheme="red" mr={3} onClick={handleColorPickerClose}>
                Cancel
              </Button>
              <Button onClick={handleColorSelect} colorScheme="blue">
                Apply
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ColorPicker;
