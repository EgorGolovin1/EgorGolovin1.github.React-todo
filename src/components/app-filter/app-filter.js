import "./app-filter.css";

const AppFilter = (props) => {
    const { onDeleteCompleted, onDeleteAll } = props;
    if (props.fulltasks.length) {
        const buttonsData = [
            { name: "all", label: "Show All" },
            { name: "ShowActive", label: "Show Active" },
            { name: "ShowCompleted", label: "Show Completed" },
        ];

        const buttons = buttonsData.map(({ name, label }) => {
            const active = props.mode === name;
            const visual = active ? "tabbed" : "";
            return (
                <button
                    type="button"
                    className={`btn ${visual}`}
                    key={name}
                    onClick={() => props.onModeSelect(name)}
                >
                    {label}
                </button>
            );
        });
        return (
            <div className="app-filter">
                <div className="app-filter-score-tasks">
                    Amount of Tasks: {props.tasksScore}
                </div>
                <div className="buttons-wrapper">{buttons}</div>
                <div className="buttons-wrapper">
                    <button
                        onClick={onDeleteCompleted}
                        className="btn clear-completed"
                    >
                        Clear Completed
                    </button>
                    <button onClick={onDeleteAll} className="btn clear-all">
                        Clear All
                    </button>
                </div>
            </div>
        );
    }
};

export default AppFilter;
