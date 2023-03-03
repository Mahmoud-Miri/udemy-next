import React from "react";
import { Box, Button, Stack, useToast } from "@chakra-ui/react";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ColorSelector from "./ColorSelector";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const tempInitialValues: CustomizeThemeForm = {
  primaryColor: "#000000",
  secondaryColor: "#FF0000",
};

const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

type ColorPickerProps = {
  initialValues: CustomizeThemeForm;
};

export type CustomizeThemeForm = {
  primaryColor: string;
  secondaryColor: string;
};

const customizeThemeSchema = yup.object().shape({
  primaryColor: yup.string().matches(hexColorRegex, "Invalid hex color value"),
  secondaryColor: yup
    .string()
    .matches(hexColorRegex, "Invalid hex color value"),
});

const ThemeCustomizer: React.FC<ColorPickerProps> = ({
  initialValues = tempInitialValues,
}) => {
  const toast = useToast();

  const { control, handleSubmit } = useForm<CustomizeThemeForm>({
    resolver: yupResolver(customizeThemeSchema),
    defaultValues: { ...initialValues },
    mode: "onChange",
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
          />
          <ColorSelector
            name="secondaryColor"
            label="Secondary Color"
            control={control}
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

export default withPageAuthRequired(ThemeCustomizer);
