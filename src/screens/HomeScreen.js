import { React, useState, useEffect, useContext } from "react";
import {
  Text,
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import ToDoContext from "../reducer/Context";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const HomeScreen = ({ navigation }) => {
  const { toDo } = useContext(ToDoContext);

  const { date1, changedate } = useState("");

  const pendingobj = {};
  const completedobj = {};

  const Pending = toDo.filter((toDo) => {
    return toDo.completed === false;
  });

  const Completed = toDo.filter((toDo) => {
    return toDo.completed === true;
  });

  const completedMarking = { color: "green" };
  const pendingMarking = { color: "yellow" };

  Pending.forEach((pending) => {
    Object.assign(pendingobj, {
      [pending.date]: {
        dots: [pendingMarking],
        selected: true,
        marked: true,
        selectedColor: "blue",
        // dotColor: "white",
      },
    });
  });

  //const pendobj = { dot: pendingMarking, ...pendingobj };
  console.log(pendingobj);

  Completed.map((Completed) => {
    Object.assign(completedobj, {
      [Completed.date]: {
        dots: [completedMarking],
        selected: true,
        marked: true,
        selectedColor: "blue",

        // dotColor: "white",
      },
    });
  });

  console.log(pendingobj);

  // Completed.map((completed) =>
  // completedDate.set(completed.date, {
  // dots: [completedMarking],
  //selected: true,
  //marked: true,
  //selectedColor: "blue",
  //dotColor: "red",
  //})
  //);

  //  const obj = Object.fromEntries(completedDate);

  // copy array elements to th object

  // const pendingdateObject = Object.fromEntries(...p);
  //console.log(pendingdateObject);
  //const completeddateObject = Object.fromEntries(completedDate);
  console.log({ dots: [pendingMarking], ...pendingobj, ...completedobj });

  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Text style={styles.pendingText}>{Pending.length} Pending items</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.overdueText}>{Pending.length} Overdue items</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.completedText}>
          {Completed.length} Completed items
        </Text>
      </Pressable>
      <Calendar
        initialDate={"2022-08-08"}
        markingType={"multi-dot"}
        hideDayNames={false}
        markedDates={{ ...pendingobj, ...completedobj }}
      ></Calendar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: `#ffe4e1`,
  },
  button: {
    borderWidth: 2,
    alignSelf: "center",
    width: 250,
    height: 60,
    margin: 10,
    borderRadius: 10,
  },

  completedText: {
    color: "green",
    fontWeight: "bold",
  },

  pendingText: {
    color: `#ffd700`,
    fontWeight: "bold",
  },

  overdueText: {
    color: `#ff0000`,
    fontWeight: "bold",
  },
});

export default HomeScreen;
