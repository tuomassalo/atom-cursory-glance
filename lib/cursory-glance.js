"use babel";

import { CompositeDisposable } from "atom";

export default {
  subscriptions: null,

  activate(state) {

    const update = editor => {
      const view = atom.views.getView(editor);
      const cursorCount = editor.getCursors().length;
      view.classList.remove(
        "cursory-glance",
        "cursory-glance-2",
        "cursory-glance-2",
        "cursory-glance-3",
        "cursory-glance-4",
        "cursory-glance-5",
        "cursory-glance-6",
        "cursory-glance-7",
        "cursory-glance-8",
        "cursory-glance-9"
      );
      if (cursorCount > 1) {
        view.classList.add("cursory-glance", "cursory-glance-" + cursorCount);
      } else {
      }
    };

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      atom.workspace.getCenter().observeActivePaneItem(item => {
        if (!atom.workspace.isTextEditor(item)) return;
        update(item);
        this.subscriptions.add(item.onDidAddCursor(() => update(item)));
        this.subscriptions.add(item.onDidRemoveCursor(() => update(item)));
      })
    );

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
        "cursory-glance:toggle": () => this.toggle()
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },
};
