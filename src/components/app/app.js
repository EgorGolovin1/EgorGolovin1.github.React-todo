import { Component } from "react";

import "./app.css";
import AddPanel from "../tasks-add-form/tasks-add-form";
import TasksList from "../tasks-list/tasks-list";
import AppFilter from "../app-filter/app-filter";
import Explanation from "../explanation-menu/explanation-menu";
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
    constructor(props) {
        super(props);
        if (
            localStorage.tasks 
        ) {
            let localMode;
            let localTasks;
            localTasks = JSON.parse(localStorage.getItem("tasks"));
            localMode = JSON.parse(localStorage.getItem("mode"));
            this.state = {
                tasks: localTasks,
                mode: localMode,
            };
        } else this.state = { tasks: [], mode: "all"};
    }

    addTask = (description) => {
        const newTask = {
            counter: 0,
            description,
            completed: false,
            deleting: false,
            key: uuidv4(),
        };
        this.setState(({ tasks }) => {
            const newTasksArr = [...tasks, newTask];
            return {
                tasks: newTasksArr,
            };
        });
    };

    deleteTask = (key, prop) => {
        setTimeout(() => {
            this.setState(({ tasks }) => {
                return {
                    tasks: tasks.filter((item) => item.key !== key),
                };
            });
        }, 600);
        this.setState(({ tasks }) => ({
            tasks: tasks.map((item) => {
                if (item.key === key) {
                    return { ...item, [prop]: !item[prop] };
                }
                return item;
            }),
        }));
    };

    checkVisability = (items, mode) => {
        switch (mode) {
            case "ShowActive":
                return items.filter((item) => !item.completed);
            case "ShowCompleted":
                return items.filter((item) => item.completed);
            default:
                return items;
        }
    };

    onToggleProp = (key, prop) => {
        this.setState(({ tasks }) => ({
            tasks: tasks.map((item) => {
                if (item.key === key) {
                    return { ...item, [prop]: !item[prop] };
                }
                if (item.completed) {
                    item.checked = true;
                }
                return item;
            }),
        }));
    };

    onModeSelect = (mode) => {
        this.setState({ mode });
    };

    updateLocal = (tasks, mode) => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("mode", JSON.stringify(mode));
    };

    clearCompleted = () => {
        this.setState(({ tasks }) => {
            return {
                tasks: tasks.filter((item) => !item.completed === true),
            };
        });
    };

    clearAll = () => {
        this.setState(() => {
            return {
                tasks: [],
            };
        });
    };

    saveChangeText = (key, ncontent, button, target) => {
        if (button === 13) {
            this.setState(({ tasks }) => ({
                tasks: tasks.map((item) => {
                    if (item.key === key) {
                        item.description = ncontent;
                    }
                    return item;
                }),
            }));
            target.blur();
        }
    };
    render() {
        let { tasks, mode } = this.state;
        const visibleTasks = this.checkVisability(tasks, mode);
        let tasksScore = this.state.tasks.length;
        this.updateLocal(tasks, mode);
        return (
            <div className="app">
                <h1>todo</h1>
                <AddPanel
                    onAdd={this.addTask}
                    localEvidence={this.localEvidence}
                    updateLocal={this.updateLocal}
                />
                <div className="tasks-panel">
                    <TasksList
                        tasks={visibleTasks}
                        onDelete={this.deleteTask}
                        onToggleProp={this.onToggleProp}
                        saveChangeText={this.saveChangeText}
                    />
                </div>
                <div className="filter-panel">
                    <AppFilter
                        onDeleteAll={this.clearAll}
                        onDeleteCompleted={this.clearCompleted}
                        tasksScore={tasksScore}
                        fulltasks={tasks}
                        tasks={visibleTasks}
                        mode={mode}
                        onModeSelect={this.onModeSelect}
                    />
                </div>
                <div className="explanation-panel">
                    <Explanation />
                </div>
            </div>
        );
    }
}
export default App;




