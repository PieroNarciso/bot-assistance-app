import { TouchableOpacity } from "react-native";
import { Button, Text, XStack } from "tamagui";
import { Fontisto } from "@expo/vector-icons";

type Props = {
  date: Date;
  onDelete: () => void;
};

const DateStatusItem = (props: Props) => {
  return (
    <TouchableOpacity>
      <XStack alignItems="center" justifyContent="space-between" paddingHorizontal="$5" paddingVertical="$2">
        <Text>{props.date.toDateString()}</Text>
        <Button
          circular
          onPress={props.onDelete}
          icon={<Fontisto name="trash" size={24} color="black" />}
        ></Button>
      </XStack>
    </TouchableOpacity>
  );
};

export default DateStatusItem;
