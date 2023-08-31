import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";
import Item from "./components/Item";

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem("tasks");
      return savedTasks != null ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Error loading tasks:", error);
      return [];
    }
  };

  // GET TASKS FROM ASYNCSTORAGE
  const loadAndSetTasks = async () => {
    const savedTasks = await loadTasks();
    setTaskItems(savedTasks);
  };

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task.trim() !== "") {
      const updatedTasks = [...taskItems, task];
      setTaskItems(updatedTasks);
      saveTasks(updatedTasks);
      setTask("");
    }
  };

  const completeTask = (index) => {
    console.log("TASK COMPLETED...");
    const itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    saveTasks(itemsCopy);
  };

  useEffect(() => {
    loadAndSetTasks();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Task List</Text>
          <View style={styles.items}>
            {taskItems.map((item, index) => (
              <TouchableOpacity key={index}>
                <Item text={item} completeTask={() => completeTask(index)} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.addTaskButton}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={"Create New Task"}
            value={task}
            onChangeText={(text) => setTask(text)}
          />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>
                <FontAwesome5 name="angle-right" size={20} color="#007dbc" />
              </Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  addTaskButton: {
    height: 110,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    width: "100%",
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    width: 280,
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
