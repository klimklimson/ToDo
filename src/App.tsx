import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" |  "active" | "completed";

function App() {

    const [tasks, setTask] = useState<Array<TaskType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ]);

    function removeTask(id: string) {
        // let filteredTasks = tasks.filter(t => t.id !== id)
        setTask(() => tasks.filter(t => t.id !== id))
    }

    function addTask(title: string) {
        if(title!=="") {
            let newTask = {id: v1(), title: title, isDone: false};
            let newTasks = [newTask, ...tasks];
            setTask(newTasks);
        }
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodoList = tasks;

    if (filter === "completed")
        tasksForTodoList = tasks.filter(t => t.isDone === true);
    else if (filter === "active")
        tasksForTodoList = tasks.filter(t => t.isDone === false);


    return (
        <div className="App">
            <TodoList title="What to learn"
                      tasks={tasksForTodoList}
                      addTask={addTask}
                      changeFilter={changeFilter}
                      removeTask={removeTask}/>

        </div>
    );
}

export default App;
