import { StyleSheet } from "@react-pdf/renderer";

export default StyleSheet.create({

  page: {
    padding: 35,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#333"
  },

  header: {
    textAlign: "center",
    marginBottom: 20
  },

  name: {
    fontSize: 24,
    fontWeight: "bold"
  },

  info: {
    fontSize: 10,
    marginTop: 3
  },

  section: {
    marginTop: 18
  },

  heading: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#2563eb",
    paddingBottom: 3
  },

  text: {
    fontSize: 11,
    lineHeight: 1.5
  },

  item: {
    marginBottom: 8
  }

});