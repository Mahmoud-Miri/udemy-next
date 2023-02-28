import React from "react";
import { Box, Button, Stack, useToast } from "@chakra-ui/react";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ColorSelector from "@/pages/customize/ColorSelector";

const tempInitialValues: CustomizeThemeForm = {
  primaryColor: "#000000",
  secondaryColor: "#FF0000",
};

type ColorPickerProps = {
  initialValues: CustomizeThemeForm;
};

export type CustomizeThemeForm = {
  primaryColor: string;
  secondaryColor: string;
};

const customizeThemeSchema = yup.object().shape({
  primaryColor: yup.string(),
});

const ThemeCustomizer: React.FC<ColorPickerProps> = ({
  initialValues = tempInitialValues,
}) => {
  const toast = useToast();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CustomizeThemeForm>({
    resolver: yupResolver(customizeThemeSchema),
    defaultValues: { ...initialValues },
  });

  const onSubmit = (data: CustomizeThemeForm) => {
    toast({
      title: "Theme Customizations submitted",
      description: JSON.stringify(data),
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="4" justifyContent="flex-end">
          <ColorSelector
            name="primaryColor"
            label="Primary Color"
            control={control}
            setValue={setValue}
          />
          <ColorSelector
            name="secondaryColor"
            label="Secondary Color"
            control={control}
            setValue={setValue}
          />
          <Button
            type="submit"
            mt="4"
            size="md"
            alignSelf="flex-start"
            colorScheme="blue"
          >
            Save
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ThemeCustomizer;
