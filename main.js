const app = new Vue({
  el: "#app",
  data: {
    todos: [],
    edit: null,
    addText: "",
  },
  computed: {
    changeButtonText() {
      return this.edit === null ? "追加" : "更新";
    },
    loadTodos() {
      const json = localStorage.getItem("todo");
      console.log(json);
      if (json != null) this.todos = JSON.parse(json);
    },
  },
  created() {
    this.loadTodos;
  },
  methods: {
    addToDo: function () {
      if (this.addText !== "" && this.edit === null) {
        const todo = {
          id: this.todos.length,
          text: this.addText,
          isChecked: false,
        };
        this.todos.push(todo);
      } else {
        this.todos[this.edit].text = this.addText;
        this.edit = null;
      }
      this.addText = "";
      this.saveTodos();
    },
    deleteTodo(id) {
      if (this.edit === id) {
        alert("todoが保存されていません");
      } else {
        this.todos = this.todos.filter((todo) => {
          return todo.id != id;
        });
        this.saveTodos();
      }
    },
    editTodo(id) {
      this.edit = id;
      this.addText = this.todos[id].text;
      this.$refs.editor.focus();
    },
    saveTodos() {
      const json = JSON.stringify(this.todos);
      localStorage.setItem("todo", json);
    },
  },
});
