import * as React from "react";
import { Button, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import jsonServer from "./src/api/jsonServer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import CreateScreen from "./src/screens/CreateScreen";

import { useContext, useReducer, useEffect } from "react";
import ToDoContext from "./src/reducer/Context";
import CalenderScreen from "./src/screens/CalenderScreen";
import ModalScreen from "./src/screens/ModalScreen";

import IndexScreen from "./src/screens/ListScreen";
import HomeScreen from "./src/screens/HomeScreen";
import EditScreen from "./src/screens/EditScreen";

const dateformat = function (date, itemDate) {
  const today = Moment(date).format("YYYY-MM-DD");
  const tomorrow = Moment(date).add(1, "days").format("YYYY-MM-DD");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (itemDate === today) {
    return "Today";
  }

  if (itemDate === tomorrow) {
    return "Tomorrow";
  } else {
    const iterable = itemDate.split("-");

    return `${
      iterable[2] + " " + months[+iterable[1] - 1] + " " + iterable[0]
    }`;
  }
};

const initialtoDo = [];
const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          title: action.title,
          description: action.description,
          completed: false,
          date: action.date,
          id: action.id,
          icon: action.icon,
          datewords: action.datewords,
        },
      ];
    case "complete":
      const itemComp = state.find((element) => {
        return element.id === action.id;
      });

      const remaining = state.filter((element) => {
        return element.id !== action.id;
      });

      return [
        {
          ...itemComp,
          completed: !itemComp.completed,
          icon: itemComp.completed ? "circle" : "check",
          colors: itemComp.completed ? { color: "yellow" } : { color: "green" },
        },
        ...remaining,
      ];

    case "delete":
      return state.filter((item) => item.id !== action.id);

    case "edit":
      return [
        ...state,
        {
          title: action.title,
          description: action.description,
          completed: false,
          date: action.date,
          id: action.id,
          icon: action.icon,
          datewords: action.datewords,
        },
      ];

    case "get_Posts":
      return action.payload;

    default:
      return state;
  }
};

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: `#db7093` },
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <HomeStack.Screen
        name="Calender"
        component={CalenderScreen}
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: `#db7093` },
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <HomeStack.Screen
        name="Completed"
        component={ModalScreen}
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: `#db7093` },
          headerTitleStyle: { fontWeight: "bold" },
          headerBackVisible: false,
        }}
      />
    </HomeStack.Navigator>
  );
}

const IndexStack = createNativeStackNavigator();

function IndexStackScreen({ navigation }) {
  return (
    <IndexStack.Navigator>
      <IndexStack.Screen
        name="To-Do List"
        component={IndexScreen}

        //options={{
        //headerTintColor: "white",
        //headerStyle: { backgroundColor: `#db7093` },
        //headerTitleStyle: { fontWeight: "bold" },
        // headerRight: () => (
        //  <TouchableOpacity>
        //  <Feather name="more-horizontal" size={35} color="white" />
        //</TouchableOpacity>
        //),
        //}}
      />

      <IndexStack.Screen
        name="Create"
        component={CreateScreen}
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: `#db7093` },
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <IndexStack.Screen
        name="Edit"
        component={EditScreen}
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: `#db7093` },
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </IndexStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [toDo, dispatch] = useReducer(reducer, initialtoDo);

  const addBlogpost = async (title, Description, date) => {
    await jsonServer.post("/posts", {
      title: title,
      description: Description,
      date: date,
      completed: false,
      icon: "circle",
      colors: { color: "yellow" },
      datewords: dateformat(new Date(), date),
    });
    const response = await jsonServer.get("/posts");

    dispatch({ type: "get_Posts", payload: response.data });
  };

  const completedtoDO = async (id) => {
    const itemComp = toDo.find((element) => {
      return element.id === id;
    });
    await jsonServer.put(`/posts/${id}`, {
      ...itemComp,
      completed: !itemComp.completed,
      icon: itemComp.completed ? "circle" : "check",
      colors: itemComp.completed ? { color: "yellow" } : { color: "green" },
    });
    gettoDo();
    dispatch({ type: "complete", id: id });
    //gettoDo();
  };
  const deleteItem = async (id) => {
    await jsonServer.delete(`/posts/${id}`);
    dispatch({ type: "delete", id: id });
  };

  const editBlogpost = async (id, title, Description, date, callback) => {
    await jsonServer.put(`/posts/${id}`, {
      title: title,
      description: Description,
      date: date,
      completed: false,
      icon: "circle",
      datewords: dateformat(new Date(), date),
    });

    gettoDo();
    callback();
  };

  const gettoDo = async () => {
    const response = await jsonServer.get("/posts");
    const datas = response.data;
    [...datas].forEach((d) => (d.datewords = dateformat(new Date(), d.date)));

    //console.log(d);
    dispatch({ type: "get_Posts", payload: datas });
  };
  return (
    <NavigationContainer>
      <ToDoContext.Provider
        value={{
          addBlogpost,
          toDo,
          completedtoDO,
          deleteItem,
          editBlogpost,
          gettoDo,
        }}
      >
        <Tab.Navigator>
          <Tab.Screen
            name="Home3"
            component={HomeStackScreen}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <Ionicons name="home-outline" size={34} color={`#db7093`} />
              ),
            }}
          />
          <Tab.Screen
            name="List"
            component={IndexStackScreen}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <Ionicons name="ios-list-outline" size={34} color={`#db7093`} />
              ),
            }}
          />
        </Tab.Navigator>
      </ToDoContext.Provider>
    </NavigationContainer>
  );
}
