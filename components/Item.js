import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

const Item = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const completeTask = () => {
    props.completeTask();
    closeContextMenu();
  };

  const toggleContextMenu = () => {
    setIsContextMenuVisible(!isContextMenuVisible);
  };

  const closeContextMenu = () => {
    setIsContextMenuVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={closeContextMenu}>
      <View style={styles.item}>
        <TouchableOpacity onPress={handleCheck} onLongPress={toggleContextMenu}>
          <View style={styles.itemLeft}>
            <Text style={styles.checkboxText}>
              {isChecked ? (
                <Ionicons name="checkbox-outline" size={28} color="black" />
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-outline"
                  size={28}
                  color="black"
                />
              )}
            </Text>
            <Text
              style={[
                styles.itemText,
                { textDecorationLine: isChecked ? "line-through" : "none" },
              ]}
            >
              {props.text}
            </Text>
          </View>
        </TouchableOpacity>

        {isContextMenuVisible && (
          <View style={styles.contextMenu}>
            <TouchableOpacity onPress={completeTask}>
              <View style={styles.deleteButton}>
                <AntDesign name="delete" size={24} color="red" />
                <Text style={styles.deleteText}>Delete This Task</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  checkboxText: {
    fontSize: 20,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 2,
  },
  deleteText: {
    fontWeight: "700",
    marginLeft: 4,
  },
  contextMenu: {
    position: "absolute",
    top: "100%",
    right: 10,
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contextMenuItem: {
    fontSize: 16,
  },
});

export default Item;
