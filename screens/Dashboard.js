import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/CustomButton";
import { Feather } from "@expo/vector-icons";
import { styles } from "../GloabalStylesheet";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

export default function Dashboard({ navigation, route }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  let ModalResult = {};

  const getModalContent = (value) => {
    ModalResult = users.filter((user) => user.id === value);
    setSelectedUser(ModalResult[0]);
  };

  const handleDelete = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM users WHERE id=?",
        [id],
        (txObj, rs) => console.log("DELETE:OK"),
        (txObj, error) => console.log(error)
      );
    });
  };

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM users",
          null,
          (txObj, { rows: { _array } }) => setUsers(_array),
          (txObj, error) => console.log(error)
        );
      },
      [users]
    );
    // console.log(users)
  }, [users]);

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 40,
        alignItems: "center",
        backgroundColor:'white'
      }}
    >
      <StatusBar backgroundColor="transparent" style="dark" />
      <View style={styles.boxContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>CONTACT BOOK</Text>
      </View>
      <View style={styles.boxContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>ALL USERS</Text>
          <CustomButton
            bg="#00719c"
            iconName="add-user"
            text="Add new"
            width={90}
            onPress={() => navigation.navigate("Register")}
          />
        </View>

        <View style={{ marginTop: 10, paddingHorizontal: 5, width: "90%" }}>
          {users.map((user) => (
            <TouchableOpacity
              key={user.id}
              style={{
                borderWidth: 0.7,
                padding: 3,
                paddingHorizontal: 25,
                borderRadius: 3,
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
                flexDirection: "row",
              }}
              onPress={() => {
                getModalContent(user.id);
                setModalVisible(true);
              }}
            >
              <Feather name="user" size={24} color="black" />
              <Text style={{ fontSize: 15 }}>{user.lastname}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.6)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "#ffecef",
              width: "100%",
              height: "50%",
              borderTopRightRadius: 35,
              borderTopLeftRadius: 35,
              alignItems: "center",
            }}
          >
            <Text style={{ marginTop: 30, fontWeight: "bold", fontSize: 20 }}>
              {selectedUser.lastname}
            </Text>
            <View
              style={{
                marginTop: 20,
                borderWidth: 0.4,
                width: "80%",
                borderRadius: 8,
                padding: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ marginBottom: 8, fontSize: 18 }}>
                Phone Number:{" "}
                <Text style={{ fontWeight: "bold" }}>{selectedUser.phone}</Text>
              </Text>
              <Text style={{ marginBottom: 8, fontSize: 18 }}>
                Full Names:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {selectedUser.firstname} {selectedUser.lastname}
                </Text>
              </Text>
             
              <Text style={{ marginBottom: 8, fontSize: 18 }}>
                Email:{" "}
                <Text style={{ fontWeight: "bold" }}>{selectedUser.email}</Text>
              </Text>
            </View>
            <View
              style={{
                padding: 8,
                flexDirection: "row",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <CustomButton
                bg="#cc0000"
                iconName="trash"
                text="DELETE"
                width={120}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  handleDelete(selectedUser.id);
                }}
              />
              <CustomButton
                bg="#6aa84f"
                iconName="arrow-up"
                text="UPDATE"
                width={120}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate("Update", {
                    email: selectedUser.email,
                    firstname: selectedUser.firstname,
                    lastname: selectedUser.lastname,
                    
                    phone: selectedUser.phone,
                    id: selectedUser.id,
                  });
                }}
              />
            </View>
            <CustomButton
              bg="black"
              iconName="circle-with-cross"
              text="CLOSE"
              width={270}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
