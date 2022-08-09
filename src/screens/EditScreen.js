import React from "react";
import TodoListForm from "../components/Todolistform";
import ToDoContext from "../reducer/Context";
import { useContext } from "react";
import { Text } from "react-native";

const EditScreen = (navigation) => {
  const { toDo, editBlogpost } = useContext(ToDoContext);
  const id = navigation.route.params.id;
  const toDoItem = toDo.find((toDo) => toDo.id === id);
  const initialValues = {
    title: toDoItem.title,
    description: toDoItem.description,
  };

  return (
    <TodoListForm
      initialvalues={initialValues}
      onSubmit={(title, description, date) => {
        toDo.pop();
        editBlogpost(title, description, date);
        navigation.navigation.navigate("To-Do List");
      }}
    ></TodoListForm>
  );
};

export default EditScreen;
