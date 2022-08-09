import * as React from "react";
import { Button, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import CreateScreen from "./src/screens/CreateScreen";

import Context from "./src/reducer/Context";
import { useContext, useReducer } from "react";
import ToDoContext from "./src/reducer/Context";

import IndexScreen from "./src/screens/ListScreen";
import HomeScreen from "./src/screens/HomeScreen";
import EditScreen from "./src/screens/EditScreen";

const dateformat = function (date, itemDate) {
  const year = date.getFullYear();
  const day = date.getDate();
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
  const month =
    date.getMonth() + 1 < 10
      ? "" + 0 + (date.getMonth() + 1)
      : date.getMonth() + 1;

  const Today = `${year}-${month}-${day < 10 ? "" + 0 + day : day}`;
  const Tomorrow = `${year}-${month}-${
    day + 1 < 10 ? "" + 0 + (day + 1) : day + 1
  }`;

  console.log(Today);

  if (itemDate === Today) {
    return "Today";
  }

  if (itemDate === Tomorrow) {
    return "Tomorrow";
  } else {
    //console.log(iterable);

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
    </HomeStack.Navigator>
  );
}

const IndexStack = createNativeStackNavigator();

function IndexStackScreen() {
  return (
    <IndexStack.Navigator>
      <IndexStack.Screen
        name="To-Do List"
        component={IndexScreen}
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: `#db7093` },
          headerTitleStyle: { fontWeight: "bold" },
          headerRight: () => (
            <TouchableOpacity>
              <Feather name="more-horizontal" size={35} color="white" />
            </TouchableOpacity>
          ),
        }}
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
  const addBlogpost = (title, Description, date) => {
    dispatch({
      type: "add",
      title: title,
      description: Description,
      id: Math.floor(Math.random() * 9999),
      completed: false,
      date: date,
      icon: "circle",
      datewords: dateformat(new Date(), date),
    });
    console.log(toDo);
  };

  const completedtoDO = (id) => {
    dispatch({ type: "complete", id: id });
  };

  const deleteItem = (id) => {
    dispatch({ type: "delete", id: id });
  };

  const editBlogpost = (title, Description, date) => {
    dispatch({
      type: "edit",
      title: title,
      description: Description,
      id: Math.floor(Math.random() * 9999),
      completed: false,
      date: date,
      icon: "circle",
      datewords: dateformat(new Date(), date),
    });
    //console.log(toDo);
  };
  return (
    <NavigationContainer>
      <ToDoContext.Provider
        value={{ addBlogpost, toDo, completedtoDO, deleteItem, editBlogpost }}
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
