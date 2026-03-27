import React, { useState } from "react";
import { StyleSheet, Pressable, View, Text, Alert, FlatList, TextInput, TouchableOpacity } from "react-native";

export default function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const addNote = () => {
    if (note.trim() === "") return;
    setNotes([...notes, { id: Date.now().toString(), text: note }]);
    setNote("");
  };

  const handleUpdate = () => {
    if (note.trim() === "" || !editingId) return;
    setNotes(notes.map((n) => n.id === editingId ? { ...n, text: note } : n));
    setNote("");
    setEditingId(null);
  };

  const handleCancel = () => {
    setNote("");
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setNote(item.text);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => setNotes(notes.filter((n) => n.id !== id)),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes App</Text>

      <View style={styles.centerBox}>
        <TextInput
          style={styles.input}
          placeholder="Write a note..."
          value={note}
          onChangeText={setNote}
        />

        {editingId ? (
          <View style={styles.editButtons}>
            <TouchableOpacity
              style={[styles.button, styles.updateButton]}
              onPress={handleUpdate}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={addNote}>
            <Text style={styles.buttonText}>Add Note</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.noteItem}
            onPress={() => handleEdit(item)}
            onLongPress={() => handleDelete(item.id)}
          >
            <Text style={styles.noteText}>{item.text}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141327",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
    color: "#333",
  },

  centerBox: {
    alignItems: "center",
    marginBottom: 20,
  },

  input: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#4a6cf7",
    padding: 12,
    borderRadius: 10,
    width: "60%",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },

  editButtons: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },

  updateButton: {
    flex: 1,
    marginRight: 5,
  },

  cancelButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: "#888",
  },

  noteItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },

  noteText: {
    fontSize: 16,
    color: "#333",
  },
});