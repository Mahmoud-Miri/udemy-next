import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
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
import { Control, Controller, useController } from "react-hook-form";
import React, { useState } from "react";
import { CustomizeThemeForm } from "../../pages/customize";

type ColorSelectorProps = {
  name: keyof CustomizeThemeForm;
  label: string;
  control: Control<CustomizeThemeForm>;
};

const ColorSelector = ({ name, label, control }: ColorSelectorProps) => {
  const [previousColor, setPreviousColor] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    field,
    formState: { errors },
  } = useController({ name, control });

  const handleColorPickerOpen = () => {
    setPreviousColor(field.value);
    onOpen();
  };

  const handleColorPickerClose = () => {
    field.onChange(previousColor);
    field.onBlur();
    onClose();
  };

  return (
    <>
      <Grid
        templateColumns="repeat(10, 1fr)"
        alignItems="center"
        justifyItems="left"
      >
        <GridItem>
          <FormLabel htmlFor={`${name}-btn`}>{label}</FormLabel>
        </GridItem>
        <GridItem>
          <Button
            size="md"
            backgroundColor={field.value}
            onClick={handleColorPickerOpen}
            _hover={{ background: field.value }}
            border="1px"
            id={`${name}-btn`}
          />
        </GridItem>
      </Grid>

      <Modal isOpen={isOpen} onClose={handleColorPickerClose}>
        <ModalOverlay backdropFilter="auto" backdropBlur="sm" />
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
              <FormControl isInvalid={!!errors[name]}>
                <Controller
                  name={name}
                  control={control}
                  render={({ field }) => (
                    <Input
                      aria-label="Hex color value"
                      placeholder="Hex color value"
                      {...field}
                    />
                  )}
                />
                <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
          </ModalBody>
          <Divider mt={4} />
          <ModalFooter>
            <Flex justifyContent="flex-end">
              <Button colorScheme="red" mr={3} onClick={handleColorPickerClose}>
                Cancel
              </Button>
              <Button
                onClick={onClose}
                colorScheme="blue"
                isDisabled={!!errors[name]}
              >
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
