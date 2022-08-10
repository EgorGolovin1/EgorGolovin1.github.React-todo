import "./tasks-list-item.css";

const TasksListItem = (props, { tasks }) => {
    let {
        description,
        completed,
        deleting,
        onDelete,
        onToggleProp,
        saveChangeText,
    } = props;

    let classNames = "tasks-item";
    let checked;
    if (completed && !deleting) {
        classNames += " checked";
        checked = true;
    }
    if (deleting) {
        classNames += " deleting";
    }

    const scrollHeight = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + 2 + "px";
    };

    return (
        <li className={classNames}>
            <div
                className="tasks-item-description"
                suppressContentEditableWarning="true"
                onKeyPress={saveChangeText}
                contentEditable="true"
                onInput={scrollHeight}
            >
                {description}
            </div>
            <div className="tasks-buttons">
                <input
                    onChange={onToggleProp}
                    data-toggle="completed"
                    checked={checked}
                    type="checkbox"
                    className="tasks-btn-complete"
                />
                <div
                    onClick={onDelete}
                    data-toggle="deleting"
                    className="tasks-btn-delete "
                ></div>
            </div>
        </li>
    );
};

export default TasksListItem;