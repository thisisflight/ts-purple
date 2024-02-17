interface ITask {
  id: number;
  date: string;
  title: string;
}

class Task implements ITask {
  constructor(public id: number, public date: string, public title: string) {}
}

class TaskList {
  private tasks: Task[] = [];

  sortByDate() {
    this.tasks.sort(
      (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()
    );
  }

  sortById(): void {
    this.tasks.sort((a, b) => a.id - b.id);
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  count(): number {
    return this.tasks.length;
  }

  getIterator(iteratorType: "byDate" | "byId"): IIterator<Task> {
    if (iteratorType === "byDate") return new TaskByDateIterator(this);
    return new TaskByIDIterator(this);
  }
}

interface IIterator<T> {
  current(): Task | undefined;
  next(): Task | undefined;
  previous(): Task | undefined;
  index(): number;
}

abstract class TaskIteratorBase implements IIterator<Task> {
  position: number = 0;
  taskList: TaskList;

  constructor(taskList: TaskList) {
    this.taskList = taskList;
  }

  current(): Task | undefined {
    return this.taskList.getTasks()[this.position];
  }

  next(): Task | undefined {
    this.position++;
    return this.taskList.getTasks()[this.position];
  }

  previous(): Task | undefined {
    this.position--;
    return this.taskList.getTasks()[this.position];
  }

  index(): number {
    return this.position;
  }
}

class TaskByIDIterator extends TaskIteratorBase {
  constructor(taskList: TaskList) {
    super(taskList);
    taskList.sortById();
  }
}

class TaskByDateIterator extends TaskIteratorBase {
  constructor(taskList: TaskList) {
    super(taskList);
    taskList.sortByDate();
  }
}

const taskList = new TaskList();
for (let i = 9; i >= 1; i--) {
  taskList.addTask(
    new Task(Math.round(Math.random() * 100), `2024-02-0${i}`, `задача ${i}`)
  );
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
