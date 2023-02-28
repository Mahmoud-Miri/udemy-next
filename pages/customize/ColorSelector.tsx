import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Control, Controller, SetValueConfig } from "react-hook-form";
import React, { useState } from "react";
import { CustomizeThemeForm } from "@/pages/customize/index";

type ColorSelectorProps = {
  name: keyof CustomizeThemeForm;
  label: string;
  control: Control<CustomizeThemeForm>;
  setValue: (
    name: keyof CustomizeThemeForm,
    value: string,
    options?: SetValueConfig
  ) => void;
};

const ColorSelector = ({
  name,
  label,
  control,
  setValue,
}: ColorSelectorProps) => {
  const [previousColor, setPreviousColor] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleColorPickerOpen = () => {
    setPreviousColor(control._formValues[name]);
    onOpen();
  };

  const handleColorPickerClose = () => {
    setValue(name, previousColor);
    onClose();
  };

  return (
    <>
      <FormControl id={name} mb={2}>
        <Grid
          templateColumns="repeat(10, 1fr)"
          alignItems="center"
          justifyItems="left"
        >
          <GridItem>
            <FormLabel>{label}</FormLabel>
          </GridItem>
          <GridItem>
            <Button
              size="md"
              backgroundColor={control._formValues[name]}
              onClick={handleColorPickerOpen}
              _hover={{ background: control._formValues[name] }}
              border="1px"
            />
          </GridItem>
        </Grid>
      </FormControl>

      <Modal isOpen={isOpen} onClose={handleColorPickerClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pb={1}>Select Color</ModalHeader>
          <ModalCloseButton />
          <Divider mb={4} />
          <ModalBody>
            <Flex flexDirection="row">
              <Controller
                name={name}
                control={control}
                render={({ field }) => <Input type="color" mr={4} {...field} />}
              />
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <Input placeholder="Hex color value" {...field} />
                )}
              />
            </Flex>
          </ModalBody>
          <Divider mt={4} />
          <ModalFooter>
            <Flex justifyContent="flex-end">
              <Button colorScheme="red" mr={3} onClick={handleColorPickerClose}>
                Cancel
              </Button>
              <Button onClick={onClose} colorScheme="blue">
                Apply
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ColorSelector;
