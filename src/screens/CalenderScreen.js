import { Agenda } from "react-native-calendars";
import React from "react";
import { useContext } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import ToDoContext from "../reducer/Context";
import { MaterialIcons } from "@expo/vector-icons";
import Moment from "moment";
import { NotDue } from "../helpers";

const CalenderScreen = (navigation) => {
  const { toDo } = useContext(ToDoContext);
  const result = navigation.route.params.result;
  const color = navigation.route.params.style;

  const s = {};

  const style = {};

  result.forEach((todo) => {
    s[todo.date] = [
      {
        name: result
          .filter((s) => s.date === todo.date)
          .map((p) => `- ${p.description}`)
          .join("\n\n"),
      },
    ];

    style[todo.date] = {
      selected: true,
      marked: true,
      selectedColor: color,
    };
  });
  const loaditems = (day) => {
    const date = Moment(day).add(0, "M").format("YYYY-MM");
    console.log("trigger items loading");
    return s;
  };
  return (
    <View style={{ flexDirection: "row" }}>
      <Agenda
        style={{
          height: 800,
        }}
        items={s}
        loadItemsForMonth={loaditems}
        renderItem={(item) => {
          return (
            <ScrollView style={{ borderWidth: 4, borderColor: 6 }}>
              <Text style={styles.Agendatext}>{item.name}</Text>
            </ScrollView>
          );
        }}
        showClosingKnob={true}
        renderEmptyData={() => {
          return <Text>You have no activities on your agenda yet</Text>;
        }}
        onDayPress={(day) => {}}
        theme={{ agendaKnobColor: `#00bfff` }}
        pastScrollRange={1}
        futureScrollRange={12}
        markedDates={style}
      ></Agenda>
    </View>
  );
};

const styles = StyleSheet.create({
  Agendatext: { fontSize: 15, color: `#db7093`, margin: 10, marginBottom: 10 },
});
export default CalenderScreen;
