import { render, screen, fireEvent } from "@testing-library/react";
import ThemeCustomizer, { CustomizeThemeForm } from "../../../pages/customize";

describe("ThemeCustomizer", () => {
  const initialValues: CustomizeThemeForm = {
    primaryColor: "#000000",
    secondaryColor: "#FF0000",
  };

  it("should render the color selectors with the correct labels", () => {
    render(<ThemeCustomizer initialValues={initialValues} />);
    expect(screen.getByLabelText(/primary color/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/secondary color/i)).toBeInTheDocument();
  });

  it("should update the form values when a color is selected", async () => {
    render(<ThemeCustomizer initialValues={initialValues} />);
    const primaryColorPickerButton = screen.getByLabelText(/primary color/i);
    fireEvent.click(primaryColorPickerButton);
    const primaryColorInput = await screen.findByLabelText(/hex color value/i);
    fireEvent.change(primaryColorInput, { target: { value: "#FFFFFF" } });
    fireEvent.click(screen.getByText(/apply/i));
    expect(primaryColorPickerButton).toHaveStyle({
      backgroundColor: "#FFFFFF",
    });
  });

  it("should show an error message for invalid hex color values", async () => {
    render(<ThemeCustomizer initialValues={initialValues} />);

    const primaryColorPickerButton = screen.getByLabelText(/primary color/i);

    fireEvent.click(primaryColorPickerButton);

    const primaryColorInput = await screen.findByLabelText(/hex color value/i);

    fireEvent.change(primaryColorInput, { target: { value: "#12345" } });

    expect(
      await screen.findByText(/invalid hex color value/i)
    ).toBeInTheDocument();
  });
});
