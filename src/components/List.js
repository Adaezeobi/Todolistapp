import React from "react";
import { useContext, useState } from "react";
import ToDoContext from "../reducer/Context";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Unorderedlist from "react-native-unordered-list";
const List = ({ navigation, title, result }) => {
  const { completedtoDO, deleteItem } = useContext(ToDoContext);
  //console.log(result);

  return (
    <View>
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
                      completedtoDO(item.id); //, console.log(item);
                      //setIcon();
                      console.log(item.id);
                    }}
                  >
                    <Entypo name={item.icon} size={24} color="black" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Edit", { id: item.id })}
                  >
                    <Text style={styles.desclabel}>{item.description}</Text>
                  </TouchableOpacity>
                  <View style={styles.trashcontainer}>
                    <TouchableOpacity
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
    color: `#008080`,
    fontStyle: "italic",
  },
  desclabel: { fontSize: 20 },

  rendercontainer: {
    flexDirection: "row",
    marginBottom: 15,
  },

  itemcontainer: {
    flexDirection: "row",
    justifyContent: "flex-start",

    borderBottomWidth: 1,
    flex: 1,
  },

  trashcontainer: { alignItems: "flex-end", flex: 1 },
});

export default List;
