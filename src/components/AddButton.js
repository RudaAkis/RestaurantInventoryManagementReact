import "./AddButton.css";

function AddButton({ setShowModal }) {
	return (
		<>
			<button
				className="addButton"
				onClick={() => setShowModal(true)}
			>
				+Add
			</button>
		</>
	);
}

export default AddButton;
