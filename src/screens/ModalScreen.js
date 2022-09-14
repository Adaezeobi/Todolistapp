import React from "react";
import { Text, Button, View, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import ToDoContext from "../reducer/Context";

const ModalScreen = ({ navigation }) => {
  const { toDo } = useContext(ToDoContext);

  const Completed = toDo.filter((toDo) => {
    return toDo.completed === true;
  });

  return (
    <View
      style={{
        alignItems: "flex-start",
        flexDirection: "row",
        // justifyContent: "center",
        // borderWidth: 2,
        marginTop: 40,
        marginLeft: 10,
        marginRight: 10,
        borderColor: `#808080`,
      }}
    >
      <FlatList
        data={Completed}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                borderBottomWidth: 2,
                borderColor: `#808080`,
                marginBottom: 10,
                flex: 1,
                marginLeft: 15,
                borderRadius: 5,
              }}
            >
              <Text style={{}}>
                {" "}
                <Entypo name={item.icon} size={24} color="green" />{" "}
                {item.description}
              </Text>
            </View>
          );
        }}
        style={{ marginTop: 15, top: 20 }}
      ></FlatList>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name="close" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
