import { React, useState, useEffect } from "react";
import DatePicker from "react-native-datepicker";
import Moment from "moment";
import { Text, StyleSheet, Button, View, TextInput } from "react-native";

const TodoListForm = ({ navigation, onSubmit, initialvalues }) => {
  const [title, changetitle] = useState(initialvalues.title);
  const [description, changedescription] = useState(initialvalues.description);
  const [date, setDate] = useState(Moment(new Date()).format("YYYY-MM-DD"));
  const [error, setError] = useState("");

  return (
    <View style={styles.mainContainer}>
      <View style={styles.Containertitleandtitleinput}>
        <Text style={styles.Titlelabel}> Title:</Text>

        <TextInput
          style={styles.TitleInput}
          value={title}
          onChangeText={(text) => changetitle(text)}
        ></TextInput>
      </View>
      <View style={styles.Containerdescandinput}>
        <Text style={styles.Descriptionlabel}> Description:</Text>
        <TextInput
          style={styles.DescriptionInput}
          value={description}
          onChangeText={(text) => changedescription(text)}
        ></TextInput>
      </View>
      <View style={styles.Containerdateandinput}>
        <Text style={styles.Datelabel}> Deadline:</Text>

        <DatePicker
          date={date}
          minDate={Moment(new Date()).format("YYYY-MM-DD")}
          onDateChange={(date) => {
            setDate(date);
          }}
          style={styles.DatePicker}
          //mode={"datetime"}
        ></DatePicker>
      </View>
      <Text style={styles.ErrorMessage}> {error}</Text>
      <Button
        title="Save"
        color={`#db7093`}
        style={styles.saveButton}
        onPress={() => {
          try {
            if (description === "") {
              throw new Error("Please input a description");
            } else {
              onSubmit(title, description, date);
            }
          } catch (err) {
            setError(err.message);
          }
        }}
      ></Button>
    </View>
  );
};

TodoListForm.defaultProps = {
  initialvalues: {
    title: "",
    description: "",
  },
};
const styles = StyleSheet.create({
  mainContainer: {
    //backgroundColor: `#bc8f8f`,
    height: 700,
  },
  Containertitleandtitleinput: {
    // flex: 1,
    // justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    //borderColor: "red",
    //borderWidth: 5,
  },
  Containerdescandinput: {
    // flex: 1,
    // justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  TitleInput: {
    borderWidth: 2,
    margin: 30,
    flex: 1,
  },

  DescriptionInput: {
    borderWidth: 2,
    marginTop: 30,
    height: 100,
    flex: 0.9,
  },
  Titlelabel: {
    marginRight: 24,
  },
  Descriptionlabel: {
    marginRight: 8,
    marginTop: 20,
  },
  Containerdateandinput: {
    flexDirection: "row",
    alignItems: "center",
  },

  Datelabel: {
    marginTop: 60,
    marginRight: 51,
  },

  DatePicker: {
    flex: 1,
    marginTop: 60,
  },

  ErrorMessage: {
    color: "red",
    marginTop: 20,
  },
});

export default TodoListForm;
