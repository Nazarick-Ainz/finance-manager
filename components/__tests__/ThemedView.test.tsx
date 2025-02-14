import { render } from "@testing-library/react-native";
import { ThemedView } from "../ThemedView";

describe("ThemedView", () => {
    it("should render ThemedView", async () => {
        const { getByTestId } = render(<ThemedView />);

        expect(getByTestId("themedView")).toBeTruthy();
    });

});