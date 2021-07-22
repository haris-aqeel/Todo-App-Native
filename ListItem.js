import * as React from "react";
import moment  from "moment";
import { DataTable, IconButton, Colors  } from "react-native-paper";

const ItemList = ({ id, value, deleteTodo, editTodo }) => {
  return (
    <DataTable.Row>
      <DataTable.Cell>{value}</DataTable.Cell>
      <DataTable.Cell numeric>{moment().format('YYYY-MM-DD')}</DataTable.Cell>
      <DataTable.Cell numeric>

        <IconButton
          icon="delete"
          color={Colors.red500}
          size={20}
          onPress={() => deleteTodo(id)}
        />
        <IconButton
          icon="pencil"
          color={Colors.red500}
          size={20}
          onPress={() => editTodo(id)}
        />
      </DataTable.Cell>
    </DataTable.Row>
  );
};

export default ItemList;
