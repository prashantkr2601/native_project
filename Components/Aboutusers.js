import React, { useState } from "react";
import { db } from "../Firebase/config";
import { YellowBox, Alert } from "react-native";
import { NavigationEvents } from "react-navigation";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

YellowBox.ignoreWarnings(["Setting a timer"]);

// const [show_data, setShow_data] = useState("");

export default function Aboutusers({ navigation }) {
  const [show_data, setShow_data] = useState("");
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      db.ref("/users_data").on("value", (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        var user_data = { ...data };
        var userkeys = Object.keys(user_data);

        var store_user_data = userkeys.map((key) => {
          return (
            <TouchableOpacity key={key}>
              <View style={styles.view_all_user}>
                <Text style={styles.circle}>{user_data[key].fname[0]}</Text>
                <View style={styles.details}>
                  <Text style={styles.name}>
                    {user_data[key].fname + " " + user_data[key].lname}
                  </Text>
                  <Text>{user_data[key].description}</Text>
                </View>

                <Text style={styles.key}>{user_data[key].unique_id}</Text>
              </View>
              <View
                style={{
                  borderBottomColor: "#A9A9A9",
                  borderBottomWidth: 2,
                  marginHorizontal: 10,
                  marginBottom: 10,
                }}
              />
            </TouchableOpacity>
          );
        });
        setShow_data(store_user_data);
      });
      // Alert.alert("Hello World!");
    });
  }, [navigation]);
  var store_user_data;
  if (show_data) {
    // console.log("show_data" + show_data);
    store_user_data = show_data;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <Text
          style={styles.add_new_user_btn}
          onPress={() => navigation.navigate("user_form")}
        >
          + ADD NEW USER
        </Text>
      </TouchableOpacity>
      <View style={styles.view_all_user_bg}>
        <ScrollView>{store_user_data}</ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#A9A9A9",
    flex: 1,
  },
  add_new_user_btn: {
    color: "white",
    backgroundColor: "#054961",
    padding: 10,
    marginTop: 40,
    marginLeft: "auto",
    marginRight: 10,
    borderRadius: 10,
  },
  view_all_user_bg: {
    backgroundColor: "white",
    flex: 1,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
  },
  view_all_user: {
    flexDirection: "row",
    margin: 8,
    marginBottom: 10,
  },
  circle: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    backgroundColor: "#009189",
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    textAlignVertical: "center",
    textTransform: "uppercase",
    marginRight: 5,
  },
  details: {
    flex: 2.5,
    alignItems: "center",
  },
  name: {
    justifyContent: "center",
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  key: {
    color: "#009189",
    fontWeight: "bold",
    textAlignVertical: "center",
    marginLeft: 1,
    textAlign: "center",
    flex: 1,
  },
});
