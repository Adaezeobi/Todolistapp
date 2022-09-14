import { React, useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Pending from "../components/Pending";
import { FontAwesome } from "@expo/vector-icons";

import {
  Text,
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import ToDoContext from "../reducer/Context";
import Completed from "../components/completed";

const IndexScreen = ({ navigation }) => {
  const { toDo, gettoDo } = useContext(ToDoContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [hide, setHidden] = useState(true);
  useEffect(() => {
    gettoDo(); //only  call when we first navigate to screen

    navigation.addListener("didFocus", () => {
      gettoDo();
    });
  }, []);

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <Feather name="more-horizontal" size={35} color="white" />
      </TouchableOpacity>
    ),
    headerTintColor: "white",
    headerStyle: { backgroundColor: `#db7093` },
    headerTitleStyle: { fontWeight: "bold" },
  });

  console.log(toDo);
  const filterbyDate = (date) => {
    return toDo.filter((toDo) => {
      return toDo.datewords === date && toDo.completed === false;
    });
  };

  const filterbyDatewords = () => {
    return toDo.filter((toDo) => {
      return toDo.datewords.includes(" ") && toDo.completed === false;
    });
  };
  const toDOdate = filterbyDatewords();

  const filterbycomplete = () => {
    return toDo.filter((toDo) => {
      return toDo.completed === true;
    });
  };

  return (
    // <View style={styles.container}>
    <>
      <ScrollView>
        <Pending
          title="Today"
          result={filterbyDate("Today")}
          navigation={navigation}
        ></Pending>
        <Pending
          title="Tomorrow"
          result={filterbyDate("Tomorrow")}
          navigation={navigation}
        ></Pending>
        {toDOdate.map((element) => {
          return (
            <Pending
              title={`${element.datewords}`}
              result={[element]}
              navigation={navigation}
            ></Pending>
          );
        })}
        <Completed
          title="Completed Tasks"
          result={filterbycomplete()}
          style={hide}
        ></Completed>
        <TouchableOpacity
          onPress={() => navigation.navigate("Create")}
          style={styles.createbuttonview}
        >
          <Ionicons name="add-circle-outline" size={60} color="#db7093" />
        </TouchableOpacity>
      </ScrollView>
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.ModalView}>
            <TouchableOpacity
              onPress={() => setHidden(!hide)}
              style={{ flexDirection: "row" }}
            >
              <View style={{ flex: 1, borderBottomWidth: 1 }}>
                <Text style={{ marginBottom: 4 }}>
                  {hide ? "Show Completed Tasks" : "Hide Completed Tasks"}
                </Text>
              </View>
            </TouchableOpacity>
            <Pressable
              style={{ bottom: 120, left: 300, position: "absolute" }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <FontAwesome name="close" size={24} color="black" />
            </Pressable>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  datetext: { fontSize: 25 },
  container: { backgroundColor: `#ffe4e1` },
  createbuttonview: {
    top: 500,
    right: 30,
    alignSelf: "flex-end",
    position: "absolute",
  },
  ModalView: {
    margin: 20,
    top: 500,
    height: 150,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 16,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
});

export default IndexScreen;
