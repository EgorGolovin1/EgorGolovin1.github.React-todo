import { Component } from "react";
import "./tasks-add-form.css";

class AddPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            completed: false,
        };
    }
    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.description.length < 1) return;
        this.props.onAdd(this.state.description);
        this.setState({
            description: "",
        });
    };

    render() {
        const { description } = this.state;
        return (
            <form className="add-form d-flex" onSubmit={this.onSubmit}>
                <div className="add-form">
                    <input
                        type="text"
                        name="description"
                        value={description}
                        className="add-input"
                        placeholder="What needs to be done?"
                        onChange={this.onValueChange}
                    />
                    <button type="submit" className="add-btn">
                        Add Task
                    </button>
                </div>
            </form>
        );
    }
}

export default AddPanel;
