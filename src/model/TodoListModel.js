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
}