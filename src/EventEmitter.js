export class EventEmitter {
  constructor() {
    this._listeners = new Map();
  }

  addEventListerner(type, listener) {
    // 指定したイベントに対応するSetを作成しリスナー関数を登録する。
    if (!this._listeners.has(type)) {
      this._listeners.set(type, new Set());
    }
    const listenerSet = this._listeners.get(type);
    listenerSet.add(listener);
  }

  emit(type) {
    const listenerSet = this._listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach(listener => {
      listener.call(this);
    });
  }

  removeEventListener(type, listener) {
    // 指定したイベントに対応するSetを取り出し、該当するリスナー関数を削除する
    const listenerSet = this._listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach(ownListener => {
      if (ownListener === listener) {
        listenerSet.delete(listener);
      }
    });
  }
}

