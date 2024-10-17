import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  logoutParent: {
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutInner: {
    position: "relative",
    width: "70%",
    height: "70%",
    borderWidth: 4,
    borderRadius: 20,
    borderColor: "rgba(47, 71, 190, 0.591)",
    display: "flex",
    alignItems: "center",
  },

  line: {
    backgroundColor: "#fff",
    padding: 3,
    paddingLeft: 4,
    paddingRight: 4,
    position: "absolute",
    top: -9,
  },
  lineInner: {
    width: 5,
    height: 17,
    backgroundColor: "rgba(47, 71, 190, 0.591)",
    borderRadius: 5,
  },
});

export default styles;
