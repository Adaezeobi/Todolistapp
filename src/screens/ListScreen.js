import { React, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";


import List from "../components/List";


import {
  Text,
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ToDoContext from "../reducer/Context";
import CategoryList from "../components/categoryList";

const IndexScreen = ({ navigation }) => {
  const { toDo } = useContext(ToDoContext);

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
  console.log(toDOdate);

  const filterbycomplete = () => {
    return toDo.filter((toDo) => {
      return toDo.completed === true;
    });
  };

  return (
    <View style={styles.container}>
      
        <List
          title="Today"
          result={filterbyDate("Today")}
          navigation={navigation}
        ></List>
        <List
          title="Tomorrow"
          result={filterbyDate("Tomorrow")}
          navigation={navigation}
        ></List>
        {toDOdate.map((element) => {
          return (
            <List
              title={`${element.datewords}`}
              result={[element]}
              navigation={navigation}
            ></List>
          );
        })}
      
      <CategoryList
        title="Completed Tasks"
        result={filterbycomplete()}
      ></CategoryList>
      <TouchableOpacity
        onPress={() => navigation.navigate("Create")}
        style={styles.createbuttonview}
      >
        <Ionicons name="add-circle-outline" size={60} color="#db7093" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  datetext: { fontSize: 25 },
  container: { backgroundColor: `#ffe4e1` },
  createbuttonview: { marginTop: 100, alignSelf: "flex-end" },
});

export default IndexScreen;
