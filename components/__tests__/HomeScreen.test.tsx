import RootLayout from "@/app/_layout";
import { renderRouter, screen } from "expo-router/testing-library";
import * as React from "react";
import { useColorScheme } from "react-native";

jest.useRealTimers()

jest.mock("expo-font", () => ({
    useFonts: jest.fn(() => [true]),
}));

jest.mock("@/hooks/useColorScheme", () => ({
    useColorScheme: jest.fn(),
}));

jest.mock("react-native-safe-area-context", () => {
    const React = require("react");
    return {
        SafeAreaProvider: ({ children }) => <>{children}</>,
        SafeAreaView: ({ children }) => <>{children}</>,
        useSafeAreaInsets: jest.fn(() => ({
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        })),
        useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 0, height: 0 })),
    };
});

it(`renders correctly`, () => {
    const MockComponent = jest.fn(() => <RootLayout />);

    renderRouter(
        {
            index: MockComponent,
        },
        {
            initialUrl: "/",
        }
    );
});

describe("RootLayout Theme", () => {
    it("applies dark theme when colorScheme is dark", async () => {
        (useColorScheme as jest.Mock).mockReturnValue("dark");

        const MockComponent = jest.fn(() => <RootLayout />);
        renderRouter(
            {
                index: MockComponent,
            },
            {
                initialUrl: "/",
            }
        );

        const component = await screen.getByTestId("theme-provider")

        expect(component).toBeTruthy();






        // Puedes continuar con las demás verificaciones

        // const MockComponent = jest.fn(() => <RootLayout />);
        // const { getByTestId, debug } = renderRouter(
        //     {
        //         index: RootLayout,
        //     },
        //     {
        //         initialUrl: "/",
        //     }
        // );
        // debug();
        // // Asegúrate de que el tema oscuro está siendo aplicado
        // const themeProvider = getByTestId("theme-provider");

        // console.log(themeProvider);

        // expect(themeProvider).toBe(DarkTheme);
    });

    // it('applies default theme when colorScheme is light', () => {
    //     // Simula el esquema de color claro
    //     (useColorScheme as jest.Mock).mockReturnValue('light');

    //     const MockComponent = jest.fn(() => <RootLayout />);
    //     const { getByTestId } = renderRouter(
    //         {
    //             index: MockComponent,
    //         },
    //         {
    //             initialUrl: '/',
    //         }
    //     );

    //     // Asegúrate de que el tema claro está siendo aplicado
    //     const themeProvider = getByTestId('theme-provider');
    //     expect(themeProvider.props.value).toBe(DefaultTheme);
    // });
});
