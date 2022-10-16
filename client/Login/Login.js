import React from "react";
import { StyleSheet, Text, View, TextInput, Button, Switch } from "react-native";
import styles from "./StyleSheet";
import { LoginCheck } from "./LoginCheck.js";
import {theme, darkTheme} from './Display/StyleSheet.js';

const ThemeContext = React.createContext({});

const Login = ({
  setUser,
  setPageID,
  setUserNameGlobal,
  setPasswordGlobal,
  setTransactions,
}) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [darkMode, setDarkMode] = useState(false);
  //create reference
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  //create a function to check username and password
  function RegistrationPageLoader() {
    setUserNameGlobal(username);
    setPasswordGlobal(password);
    setPageID("registration");
  }
  return (
    <ThemeContext.Provider value={darkMode ? darkTheme : theme}>
      <View style={styles.container}>
        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="username"  
          ></TextInput>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
            placeholder="password"
          ></TextInput>
        </View>
        <View style={styles.button_container}>
          <Button
            title="Login"
            style={styles.button}
            onPress={() =>
              LoginCheck(username, password, {
                setUser,
                setPageID,
                setTransactions,
              })
            }
          ></Button>
          <Button
            title="Register"
            style={styles.buton}
            onPress={(e) => RegistrationPageLoader()}
          ></Button>
        </View>
      </View>
      <Switch value={darkMode} onValueChange={setDarkMode} />
    </ThemeContext.Provider>
  );
};
export default Login;
