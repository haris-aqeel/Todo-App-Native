import React, { useState } from "react";
import { View, FlatList } from "react-native";
import ItemList from "./ListItem";
import { Button, TextInput, DataTable } from "react-native-paper";

const PizzaTranslator = () => {
  const [text, setText] = useState();
  const [editState, setEditState] = useState({
    state: 0,
    editID: null,
  });
  const [todoList, setTodoList] = useState([]);
  const onSubmitTodo = () => {
    setText("");
    editState.state === 0 &&
      setTodoList([...todoList, { id: todoList.length + 1, value: text }]);
    editState.state === 1 &&
      setTodoList([
        ...todoList.map((todo)=> {
          return todo.id === editState.editID ? {id: editState.editID, value: text}: todo
        })
      ]);
      editState.state === 1 && setEditState({state: 0, editID: null})
  };
  const handleDelete = (id) => {
    const filteredArray = todoList.filter((todo) => {
      return todo.id.toString() !== id.toString();
    });
    setTodoList(filteredArray);
  };
  const handleEdit = (id) => {
    setEditState({
      ...editState,
      state: 1,
      editID: id,
    });
    todoList.forEach((todo) => (todo.id === id ? setText(todo.value) : null));
  };
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <TextInput
        label="Todo..."
        style={{ width: 300, marginBottom: 20 }}
        value={text}
        defaultValue={text}
        onChangeText={(text) => setText(text)}
      />

      <Button
        icon="plus-circle"
        mode="contained"
        onPress={onSubmitTodo}
        disabled={!text}
      >
        {editState.state === 0 ? "Add Todo" : "Edit Todo"}
      </Button>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Item Name</DataTable.Title>
          <DataTable.Title numeric>Date</DataTable.Title>
          <DataTable.Title numeric>Actions</DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={todoList}
          renderItem={({ item }) => {
            return (
              <ItemList
                id={item.id}
                value={item.value}
                deleteTodo={handleDelete}
                editTodo={handleEdit}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </DataTable>
    </View>
  );
};

export default PizzaTranslator;
