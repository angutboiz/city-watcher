import { View } from "react-native";

import { Button } from "react-native-paper";
import useTheme from "@/hooks/useTheme";

export default function TabTwoScreen() {
    const { toggleTheme } = useTheme();
    return (
        <View>
            <View className="mt-20"></View>
            <Button icon="repeat" mode="outlined" onPress={toggleTheme}>
                Toggle Dark/Light mode
            </Button>
        </View>
    );
}
