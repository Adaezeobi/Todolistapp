import { React, useState, useContext, useEffect } from "react";

import ToDoContext from "../reducer/Context";

import TodoListForm from "../components/Todolistform";
import { Text, StyleSheet, Button, View, TextInput } from "react-native";

const CreateScreen = ({ navigation }) => {
  const { addBlogpost } = useContext(ToDoContext);

  return (
    <View style={styles.mainContainer}>
      <TodoListForm
        onSubmit={(title, description, date) => {
          addBlogpost(title, description, date);

          navigation.navigate("To-Do List");
        }}
      ></TodoListForm>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    //backgroundColor: "green",
  },
});

export default CreateScreen;
