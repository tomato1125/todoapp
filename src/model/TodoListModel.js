import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
  constructor(items = []) {
    super();
    this.items = items;
  }

  // TodoItemの合計個数を返す
  getTotalCount() {
    return this.items.length;
  }

  // 表示できるTOdoItemの配列を返す
  getTodoItems() {
    return this.items;
  }

  // TodoListの状態が更新された時に呼び出されるリスナー関数を登録する
  onChange(listener) {
    this.addEventListerner("change", listener);
  }

  emitChange() {
    this.emit("change");
  }

  // TodoItemを追加する
  addTodo(todoItem) {
    this.items.push(todoItem);
    this.emitChange();
  }

  updateTodo({ id, completed }) {
    // `id`が一致するTodoItemを見つけ、あるなら完了状態の値を更新する。
    const todoItem = this.items.find(todo => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.completed = completed;
    this.emitChange();
  }

  deleteTodo({ id }) {
    // `id`に一致しないTodoItemだけを残すことで、`id`に一致するTodoItemを削除する
    this.items = this.items.filter(todo => {
      return todo.id !== id;
    });
    this.emitChange();
  }
}