import { View, Text, TextInput, Button } from "react-native";
import React, { useEffect } from "react";
import { styles } from "../GloabalStylesheet";
import { Formik } from "formik";
import CustomButton from "../components/CustomButton";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

export default function Update({ navigation, route }) {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 60,
        alignItems: "center",
      }}
    >
      <View style={styles.boxContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          UPDATE USER DETAILS
        </Text>
      </View>
      <View style={styles.boxContainer}>
        <Formik
          initialValues={{
            email: route.params.email,
            firstname: route.params.firstname,
            lastname: route.params.lastname,
           
            phone: route.params.phone,
          }}
          onSubmit={(values,{resetForm}) => {
            db.transaction((tx) => {
              tx.executeSql(
                "UPDATE users SET firstname=?,lastname=?,phone=?,email=? WHERE id=?",
                [
                  values.firstname,
                  values.lastname,
                 
                  values.phone,
                  values.email,
                  route.params.id
                ]
              );
            });
            navigation.navigate('Dashboard')
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            handleReset,
          }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextInput
                onChangeText={handleChange("firstname")}
                onBlur={handleBlur("firstname")}
                value={values.firstname}
                placeholder="First name"
                style={{
                  borderBottomWidth: 0.7,
                  width: 250,
                  marginBottom: 10,
                  fontSize: 15,
                  color: "black",
                }}
              />
              <TextInput
                onChangeText={handleChange("lastname")}
                onBlur={handleBlur("lastname")}
                value={values.lastname}
                placeholder="Last name"
                style={{
                  borderBottomWidth: 0.7,
                  width: 250,
                  marginBottom: 10,
                  fontSize: 15,
                  color: "black",
                }}
              />
            
              <TextInput
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                placeholder="Phone number"
                style={{
                  borderBottomWidth: 0.7,
                  width: 250,
                  marginBottom: 10,
                  fontSize: 15,
                  color: "black",
                }}
              />
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email"
                style={{
                  borderBottomWidth: 0.7,
                  width: 250,
                  marginBottom: 10,
                  fontSize: 15,
                  color: "black",
                }}
              />
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <CustomButton
                  bg="#00719c"
                  iconName="save"
                  width={100}
                  text="Update"
                  onPress={handleSubmit}
                />
                <CustomButton
                  bg="#7f6000"
                  iconName="flat-brush"
                  width={100}
                  text="Clear"
                  onPress={handleReset}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
      <View style={styles.boxContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>
          GO TO DASHBOARD
        </Text>
        <CustomButton
          bg="black"
          text="DASHBOARD"
          width={200}
          iconName="back"
          onPress={() => navigation.navigate("Dashboard")}
        />
      </View>
    </View>
  );
}
