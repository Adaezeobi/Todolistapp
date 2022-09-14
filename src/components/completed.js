import React from "react";
import { useContext, useState } from "react";
import ToDoContext from "../reducer/Context";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Completed = ({ navigation, title, result, style }) => {
  const { toDo, completedtoDO, deleteItem } = useContext(ToDoContext);
  const window = Dimensions.get("window");
  console.log(style);
  return (
    <View
      style={
        style
          ? { top: window.height, bottom: window.height }
          : { top: 0, bottom: 0 }
      }
    >
      <Text style={styles.titlelabel}>{result.length === 0 ? "" : title}</Text>
      <FlatList
        data={result}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={styles.rendercontainer}>
                <View style={styles.itemcontainer}>
                  <TouchableOpacity
                    onPress={() => {
                      completedtoDO(item.id);
                    }}
                  >
                    <Entypo name={item.icon} size={24} color="black" />
                  </TouchableOpacity>

                  <Text style={styles.desclabel}>{item.description} </Text>
                  <View>
                    <TouchableOpacity
                      style={styles.trashcontainer}
                      onPress={() => {
                        deleteItem(item.id);
                      }}
                    >
                      <AntDesign name="delete" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  titlelabel: {
    fontSize: 25,
    margin: 10,
    color: `#9acd32`,
    fontStyle: "italic",
  },
  desclabel: { fontSize: 20, flex: 1, textDecorationLine: "line-through" },

  rendercontainer: {
    flexDirection: "row",
    marginBottom: 10,

    alignItems: "flex-end",
  },
  itemcontainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    flex: 1,
  },
  trashcontainer: { alignItems: "flex-end", flex: 1 },
});

export default Completed;
