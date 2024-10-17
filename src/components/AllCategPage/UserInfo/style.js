import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  parentBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  user: { width: 35, height: 35 },

  userRole: { fontSize: 14, fontWeight: "500", lineHeight: 15, maxWidth: 270 },

  userName: {
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 15,
    color: "rgba(47, 71, 190, 0.987)",
    maxWidth: 270,
  },
});

export default styles;
