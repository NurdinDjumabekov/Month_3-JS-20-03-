import { StyleSheet, Font } from "@react-pdf/renderer";

import Regular from "../../../assets/fonts/Montserrat/Montserrat-Regular.ttf";
import BlackItalic from "../../../assets/fonts/Montserrat/Montserrat-BlackItalic.ttf";
import BoldItalic from "../../../assets/fonts/Montserrat/Montserrat-BoldItalic.ttf";
import ExtraBold from "../../../assets/fonts/Montserrat/Montserrat-ExtraBold.ttf";
import ExtraLight from "../../../assets/fonts/Montserrat/Montserrat-ExtraLight.ttf";
import Italic from "../../../assets/fonts/Montserrat/Montserrat-Italic.ttf";
import Light from "../../../assets/fonts/Montserrat/Montserrat-Light.ttf";
import Medium from "../../../assets/fonts/Montserrat/Montserrat-Medium.ttf";
import SemiBold from "../../../assets/fonts/Montserrat/Montserrat-SemiBold.ttf";
import Thin from "../../../assets/fonts/Montserrat/Montserrat-Thin.ttf";

Font.register({
  family: "Montserrat",
  fonts: [
    { src: Regular, fontWeight: "400" },
    { src: BlackItalic, fontWeight: "900", fontStyle: "italic" },
    { src: BoldItalic, fontWeight: "700", fontStyle: "italic" },
    { src: ExtraBold, fontWeight: "800" },
    { src: ExtraLight, fontWeight: "200" },
    { src: Italic, fontWeight: "400", fontStyle: "italic" },
    { src: Light, fontWeight: "300" },
    { src: Medium, fontWeight: "500" },
    { src: SemiBold, fontWeight: "600" },
    { src: Thin, fontWeight: "100" },
  ],
});

export const styles = StyleSheet.create({
  page: {
    padding: 10,
    paddingVertical: 30,
    backgroundColor: "#FFFFFF",
    fontFamily: "Montserrat",
    fontWeight: "400",
    fontSize: 16,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },

  //////////////////////// left

  left: {
    width: "68%",
    borderRight: 1,
  },

  leftHeader: {
    paddingHorizontal: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },

  //////////////////////// code

  code: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 5,
    // paddingVertical: 5,
  },

  form: {
    height: 14,
    fontSize: 8,
    marginRight: 10,
    textAlign: "right",
  },

  linesBlock: {
    border: 1,
    width: 70,
    height: 14,
  },

  leftInner: {
    paddingHorizontal: 5,
  },

  titleSmall: {
    fontSize: 8,
    width: 180,
    textAlign: "right",
  },

  leftTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 10,
    marginVertical: 3,
    paddingLeft: 5,
  },

  bigTitle: { fontSize: 13 },

  ////////////////////// flexLines

  flexLines: {
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 5,
  },

  line: {
    width: "100%",
    borderBottomColor: "#222",
    borderBottomWidth: 1,
    position: "relative",
  },

  lineText: { marginBottom: 1 },

  moreText: {
    position: "absolute",
    top: 1,
    fontSize: 7,
    left: 0,
    width: "100%",
    textAlign: "center",
  },

  //////////////////////// right

  right: {
    width: "30%",
    borderLeft: 1,
    paddingHorizontal: 3,
  },

  rightInner: {
    paddingHorizontal: 5,
  },

  line100: {
    borderTop: 1,
    fontSize: 7,
    paddingLeft: 30,
    paddingTop: 3,
    position: "relative",
  },

  riha: {
    textAlign: "center",
    marginVertical: 0,
    fontSize: 11,
  },

  title: {
    fontSize: 12,
    textAlign: "center",
    marginVertical: 5,
  },

  middleText: {
    fontSize: 9,
    textAlign: "center",
    marginVertical: 0,
  },

  textSmall: {
    fontSize: 9,
    marginTop: 5,
  },

  bottomText: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    paddingLeft: 37,
  },

  textMini: {
    fontSize: 7,
  },

  ///////////////
  header: { fontSize: 10, marginBottom: 7 },

  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    // borderTopWidth: 0,
    // borderLeftWidth: 0,
    position: "relative",
    marginRight: 5,
  },

  tableRow: { flexDirection: "row", borderTop: "none" },

  tableCol: {
    width: "14%",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  moreTable: {
    width: 97,
    height: 20,
    position: "absolute",
    border: 1,
    backgroundColor: "#fff",
    left: 47,
    top: -1,
  },

  textTitle: {
    fontSize: 7,
    paddingVertical: 5,
    paddingTop: 20,
    paddingHorizontal: 1,
    fontWeight: "400",
    color: "#222",
    textAlign: "center",
  },

  tableColBottom: {
    height: 30,
  },
});
