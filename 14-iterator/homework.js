"use strict";
class Task {
    constructor(id, date, title) {
        this.id = id;
        this.date = date;
        this.title = title;
    }
}
class TaskList {
    constructor() {
        this.tasks = [];
    }
    sortByDate() {
        this.tasks.sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate());
    }
    sortById() {
        this.tasks.sort((a, b) => a.id - b.id);
    }
    addTask(task) {
        this.tasks.push(task);
    }
    getTasks() {
        return this.tasks;
    }
    count() {
        return this.tasks.length;
    }
    getIterator(iteratorType) {
        if (iteratorType === "byDate")
            return new TaskByDateIterator(this);
        return new TaskByIDIterator(this);
    }
}
class TaskIteratorBase {
    constructor(taskList) {
        this.position = 0;
        this.taskList = taskList;
    }
    current() {
        return this.taskList.getTasks()[this.position];
    }
    next() {
        this.position++;
        return this.taskList.getTasks()[this.position];
    }
    previous() {
        this.position--;
        return this.taskList.getTasks()[this.position];
    }
    index() {
        return this.position;
    }
}
class TaskByIDIterator extends TaskIteratorBase {
    constructor(taskList) {
        super(taskList);
        taskList.sortById();
    }
}
class TaskByDateIterator extends TaskIteratorBase {
    constructor(taskList) {
        super(taskList);
        taskList.sortByDate();
    }
}
const taskList = new TaskList();
for (let i = 9; i >= 1; i--) {
    taskList.addTask(new Task(Math.round(Math.random() * 100), `2024-02-0${i}`, `задача ${i}`));
}
console.log(taskList.getTasks());
const byDateIterator = taskList.getIterator("byDate");
console.log(byDateIterator.current());
console.log(byDateIterator.next());
console.log(byDateIterator.next());
console.log();
const byIdIterator = taskList.getIterator("byId");
console.log(byIdIterator.current());
console.log(byIdIterator.next());
console.log(byIdIterator.next());
