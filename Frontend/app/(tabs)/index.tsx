import { Avatar, Button, Card, Text } from "react-native-paper";
import { View } from "react-native";
import React from "react";
const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;
export default function HomeScreen() {
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
    return (
        <View>
            <Card>
                <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
                <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
                <Card.Content>
                    <Text variant="bodyMedium">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam tenetur odit eveniet inventore magnam officia quia nemo porro? Dolore sapiente quos illo distinctio nisi
                        incidunt? Eaque officiis iusto exercitationem natus?
                    </Text>
                </Card.Content>
                <Card.Actions>
                    <Button mode="contained">hello</Button>
                </Card.Actions>
            </Card>
            <View className="mt-10"></View>
            <Button mode="contained-tonal">Click here</Button>
        </View>
    );
}
