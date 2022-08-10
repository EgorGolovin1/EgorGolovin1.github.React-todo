import TasksListItem from "../tasks-list-item/tasks-list-item";

import "./tasks-list.css";

const TasksList = ({ tasks, onDelete, onToggleProp, saveChangeText }) => {
    const elements = tasks.map((item) => {
        const { key, ...itemProps } = item;
        return (
            <TasksListItem
                key={key}
                {...itemProps}
                saveChangeText={(e) =>
                    saveChangeText(
                        key,
                        e.currentTarget.textContent,
                        e.charCode,
                        e.currentTarget
                    )
                }
                onDelete={(e) =>
                    onDelete(key, e.currentTarget.getAttribute("data-toggle"))
                }
                onToggleProp={(e) =>
                    onToggleProp(
                        key,
                        e.currentTarget.getAttribute("data-toggle")
                    )
                }
            />
        );
    });
    return <ul className="task-list list-group">{elements}</ul>;
};

export default TasksList;