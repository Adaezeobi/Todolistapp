import { React, useState, useEffect, useContext } from "react";
import {
  Text,
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import ToDoContext from "../reducer/Context";
import Moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { Overdue } from "../helpers";
import { NotDue } from "../helpers";
import CalenderScreen from "./CalenderScreen";

const HomeScreen = ({ navigation }) => {
  const { toDo, gettoDo } = useContext(ToDoContext);

  const O = (todo) => {
    return todo
      .filter((todo) => todo.completed === false)
      .map((todo) => Moment(todo.date).format("MMMM Do YYYY, h:mm:ss a"));
  };

  console.log(O(toDo));
  useEffect(() => {
    gettoDo(); //only  call when we first navigate to screen
    //Overdue(toDo)
    navigation.addListener("didFocus", () => {
      gettoDo();
    });
  }, []);

  const Completed = toDo.filter((toDo) => {
    return toDo.completed === true;
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate("Calender", {
              result: NotDue(toDo),
              style: `#ffd700`,
            })
          }
        >
          <MaterialIcons name="pending-actions" size={24} color="black" />
          <Text style={styles.pendingText}>Pending Items</Text>
          <View style={{ flex: 1 }}>
            <Text
              style={{ alignSelf: "flex-end", color: "#808080", right: 10 }}
            >
              {NotDue(toDo).length}
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate("Calender", {
              result: Overdue(toDo),
              style: "red",
            })
          }
        >
          <MaterialIcons name="assignment-late" size={24} color="black" />
          <Text style={styles.overdueText}> Overdue Items</Text>
          <View style={{ flex: 1 }}>
            <Text
              style={{ alignSelf: "flex-end", color: "#808080", right: 10 }}
            >
              {Overdue(toDo).length}
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Completed")}
        >
          <MaterialIcons name="done-outline" size={24} color="black" />
          <Text style={styles.completedText}>Completed Items</Text>
          <View style={{ flex: 1 }}>
            <Text
              style={{ alignSelf: "flex-end", color: "#808080", right: 10 }}
            >
              {Completed.length}
            </Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: `white`,
    height: 800,
  },
  button: {
    borderWidth: 2,
    flexDirection: "row",
    alignSelf: "stretch",
    // width: 250,
    height: 60,
    margin: 10,
    borderRadius: 10,
    paddingTop: 15,
  },

  completedText: {
    color: "green",
    fontWeight: "bold",
    left: 10,
  },

  pendingText: {
    color: `#ffd700`,
    fontWeight: "bold",
    left: 10,
  },

  overdueText: {
    color: `#ff0000`,
    fontWeight: "bold",
    left: 10,
  },
});

export default HomeScreen;
