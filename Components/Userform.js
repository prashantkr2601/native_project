import { StatusBar } from "expo-status-bar";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { db } from "../Firebase/config";
import { YellowBox } from "react-native";

//import { getuserdata, Adddata } from "../Firebase/UserdataAPI";
import React, { useState } from "react";

import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

YellowBox.ignoreWarnings(["Setting a timer"]);

export default function Userform({ navigation }) {
  const [error_id, setError_id] = useState("");
  const [valid_id, setValid_id] = useState(false);
  const [data_id, setData_id] = useState("");

  const [error_fname, setError_fname] = useState("");
  const [valid_fname, setValid_fname] = useState(false);
  const [data_fname, setData_fname] = useState("");

  const [error_lname, setError_lname] = useState("");
  const [valid_lname, setValid_lname] = useState(false);
  const [data_lname, setData_lname] = useState("");

  const [error_description, setError_description] = useState("");
  const [valid_description, setValid_description] = useState(false);
  const [data_description, setData_description] = useState();

  const [color_id, setColor_id] = useState("red");
  const [color_fname, setColor_fname] = useState("red");
  const [color_lname, setColor_lname] = useState("red");
  const [color_description, setColor_description] = useState("red");

  function validation(text, name) {
    // console.log();
    // console.log(text);
    if (name === "id" && text.length < 11 && text.length > 0) {
      var regex = /^[a-zA-Z0-9]+$/i;
      if (text.match(regex)) {
        var orgtext = text;
        var text1 = text;
        var num = text.replace(/\D/g, "");
        var replace_number = text1.replace(/[0-9]/g, "");
        var sum = null;
        let a;

        for (let i = 0; i < num.length; i++) {
          a = parseInt(num[i]);
          sum += a;
          //console.log(num[i], sum);
        }
        //jhsdhgd
        var count = 0;
        var user_data = "";
        db.ref("/users_data").on("value", (querySnapShot) => {
          let data = querySnapShot.val() ? querySnapShot.val() : {};
          user_data = { ...data };
        });

        var userkeys = Object.keys(user_data);

        var store_user_data = userkeys.map((key) => user_data[key]);

        //storage data key sum

        for (let i = 0; i < store_user_data.length; i++) {
          let b = store_user_data[i].unique_id;

          //console.log("helloo" + b);

          var user_num = b.replace(/\D/g, "");
          var user_sum = null;
          let c;

          for (let i = 0; i < user_num.length; i++) {
            c = parseInt(user_num[i]);
            user_sum += c;
          }
          //console.log(user_num[i], user_sum);
          console.log(
            "sum=" + sum,
            "user_sum=" + user_sum,
            "replace_number=" + replace_number
          );

          if (sum === user_sum) {
            count += 1;
          }
        }
        // console.log(count);
        if (sum === null || !replace_number) {
          setValid_id(false);
          setColor_id("red");
          setError_id("ID must be contain digit & alphabet ");
        } else if (count === 0) {
          //console.log(num, orgtext, sum);
          setError_id("");
          setValid_id(true);
          setColor_id("#009189");
          setData_id(orgtext);
        } else {
          setValid_id(false);
          setColor_id("red");
          setError_id("ID Already exist ");
        }
      } else {
        setValid_id(false);
        setColor_id("red");
        setError_id("ID must be Alpha-Numeric");
      }
    } else if (name === "id") {
      setValid_id(false);
      setColor_id("red");
      setError_id("ID length must be > 0 and < 10");
    }

    if (name === "fname" && text.length > 2 && text.length < 10) {
      setError_fname("");
      setColor_fname("#009189");
      setValid_fname(true);
      setData_fname(text);
    } else if (name === "fname") {
      setColor_fname("red");
      setValid_fname(false);
      setError_fname("first name must be > 2 and < 10");
    }

    if (name === "lname" && text.length > 2 && text.length < 10) {
      setError_lname("");
      setColor_lname("#009189");
      setValid_lname(true);
      setData_lname(text);
    } else if (name === "lname") {
      setColor_lname("red");
      setValid_lname(false);
      setError_lname("last name must be > 2 and < 10");
    }
    if (name === "description" && text.length > 4 && text.length < 30) {
      setError_description("");
      setColor_description("#009189");
      setValid_description(true);
      setData_description(text);
    } else if (name === "description") {
      setColor_description("red");
      setValid_description(false);
      setError_description("description length must be > 4 and < 20");
    }
  }

  function submithandler() {
    if (valid_id && valid_fname && valid_lname && valid_description) {
      var data_time = Date();
      db.ref("/users_data").push(
        {
          unique_id: data_id,
          fname: data_fname,
          lname: data_lname,
          description: data_description,
          time: data_time,
        },
        () => {
          Alert.alert("Successful !", "Submition", [
            { text: "Understood", onPress: () => navigation.goBack() },
          ]);
        }
      );

      // console.log(input_data);
      //console.log(data_id, data_fname, data_lname, data_description);
    } else {
      Alert.alert("Please Enter All Valid Inputs");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="back" style={styles.back_btn} />
      </TouchableOpacity>
      <View style={styles.form_data_bg}>
        <ScrollView>
          <View style={styles.form_data}>
            <Text style={styles.label}>UNIQUE ID*</Text>
            <TextInput
              type="text"
              name="id"
              // setName({name:"id"})

              onChangeText={(text) => validation(text, "id")}
              style={styles.input_text}
              placeholder="Enter Your Unique Id (Max 10 char)"
            />
            {valid_id ? <Entypo name="check" style={styles.checkicon} /> : null}

            <Text style={{ color: color_id }}>
              {error_id ? error_id : null}
            </Text>
          </View>

          <View style={styles.form_data}>
            <Text style={styles.label}>FIRST NAME*</Text>
            <TextInput
              type="text"
              name="fname"
              onChangeText={(text) => validation(text, "fname")}
              style={styles.input_text}
              placeholder="Enter Your First Name"
            />
            {valid_fname ? (
              <Entypo name="check" style={styles.checkicon} />
            ) : null}

            <Text style={{ color: color_fname }}>
              {error_fname ? error_fname : null}
            </Text>
          </View>

          <View style={styles.form_data}>
            <Text style={styles.label}>LAST NAME*</Text>
            <TextInput
              type="text"
              name="lname"
              onChangeText={(text) => validation(text, "lname")}
              style={styles.input_text}
              placeholder="Enter Your Last Name"
            />
            {valid_lname ? (
              <Entypo name="check" style={styles.checkicon} />
            ) : null}
            <Text style={{ color: color_lname }}>
              {error_lname ? error_lname : null}
            </Text>
          </View>
          <View style={styles.form_data}>
            <Text style={styles.label}>DESCRIPTION*</Text>
            <TextInput
              type="text"
              name="description"
              onChangeText={(text) => validation(text, "description")}
              style={styles.input_text}
              placeholder="Enter Description"
            />
            {valid_description ? (
              <Entypo name="check" style={styles.checkicon} />
            ) : null}
            <Text style={{ color: color_description }}>
              {error_description ? error_description : null}
            </Text>
          </View>
          <TouchableOpacity>
            <View>
              <Text style={styles.submit_btn} onPress={() => submithandler()}>
                SUBMIT
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#054961",
    flex: 1,
  },
  back_btn: {
    color: "white",
    padding: 15,
    fontSize: 30,
    marginRight: "auto",
    marginLeft: 20,
    marginTop: 40,
  },
  form_data_bg: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 20,
    paddingBottom: 15,
    paddingRight: 5,
    alignSelf: "center",
    maxHeight: 440,
    flex: 1,
    width: "90%",
  },
  form_data: {
    marginBottom: 1,
  },
  label: {
    color: "#009189",
    fontSize: 15,
    fontWeight: "bold",
  },
  input_text: {
    borderBottomWidth: 2.5,
    borderBottomColor: "#009189",
    height: 40,
    fontSize: 15,
  },
  checkicon: {
    fontSize: 25,
    color: "#009189",
    position: "absolute",
    marginTop: 10,
    alignSelf: "flex-end",
  },
  submit_btn: {
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "#009189",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    padding: 12,
    borderRadius: 15,
    marginTop: 0,
    marginBottom: 10,
  },
});
