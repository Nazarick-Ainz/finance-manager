import RootLayout from "@/app/_layout";
import { renderRouter } from "expo-router/testing-library";
import * as React from "react";

jest.useRealTimers()

jest.mock("expo-font", () => ({
    useFonts: jest.fn(() => [true]),
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