import "./explanation-menu.css";

const Expplanation = () => {
    return (
        <div className="app-explanation">
            <h3 className="app-explanation-item">
                Double-click to edit a todo
            </h3>
            <h3 className="app-explanation-item">
                Press "Enter" to save your changes
            </h3>
            <h3 className="app-explanation-item">
                Created by{" "}
                <a className="my-profile" href="/#">
                    Egor Golovin
                </a>
            </h3>
        </div>
    );
};

export default Expplanation;