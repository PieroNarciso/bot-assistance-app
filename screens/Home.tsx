import uuid from "react-native-uuid";
import { Button, Text, View } from "tamagui";
import { useEffect, useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { FlatList } from "react-native";
import { AssistanceDeactivated } from "../types/assistance";
import DateStatusItem from "../components/DateStatusItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const inset = useSafeAreaInsets();
  const [date, setDate] = useState(new Date());
  const [datesDeactivated, setDatesDeactivated] = useState<
    AssistanceDeactivated[]
  >([]);

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      mode: "date",
      onChange: (_, selectedDate) => {
        if (!selectedDate) return;
        setDate(() => selectedDate);
        setDatesDeactivated([
          ...datesDeactivated,
          { date: selectedDate, deactivated: true, id: uuid.v4().toString() },
        ]);
      },
    });
  };

  const onDeleteItem = (id: string) => {
    setDatesDeactivated(datesDeactivated.filter((date) => date.id !== id));
  };

  useEffect(() => {
    setDatesDeactivated((dates) =>
      dates.sort((a, b) => a.date.getTime() - b.date.getTime()),
    );
  }, [datesDeactivated]);

  return (
    <View style={{ paddingBottom: inset.bottom }}>
      <Text>{date.toDateString()}</Text>
      <Button onPress={() => showDatePicker()}>Agregar Fecha </Button>

      <FlatList
        data={datesDeactivated}
        renderItem={(item) => (
          <DateStatusItem
            key={item.item.id}
            date={item.item.date}
            onDelete={() => onDeleteItem(item.item.id)}
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;
