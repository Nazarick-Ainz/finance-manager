import { Colors } from "@/constants/Colors";
import { renderHook } from "@testing-library/react-native";
import { useThemeColor } from "../useThemeColor";

jest.mock("@/hooks/useColorScheme", () => ({
  useColorScheme: jest.fn(),
}));

const mockUseColorScheme = require("@/hooks/useColorScheme").useColorScheme;

describe("useThemeColor", () => {
  test("should return the color provided for light mode", () => {
    mockUseColorScheme.mockReturnValue("light");

    const { result } = renderHook(() =>
      useThemeColor({ light: "#ffffff", dark: "#000000" }, "background")
    );

    expect(result.current).toBe("#ffffff");
  });

  test("should return the color provided for dark mode", () => {
    mockUseColorScheme.mockReturnValue("dark");

    const { result } = renderHook(() =>
      useThemeColor({ light: "#ffffff", dark: "#000000" }, "background")
    );

    expect(result.current).toBe("#000000");
  });

  test("should return the color of the theme if no specific color is given", () => {
    mockUseColorScheme.mockReturnValue("light");

    const { result } = renderHook(() => useThemeColor({}, "background"));

    expect(result.current).toBe(Colors.light.background);
  });

  test("should return the dark theme color if no specific color is provided", () => {
    mockUseColorScheme.mockReturnValue("dark");

    const { result } = renderHook(() => useThemeColor({}, "background"));

    expect(result.current).toBe(Colors.dark.background);
  });
});
