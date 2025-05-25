function AddButton({ setShowModal }) {
	return (
		<>
			<button
				className="openModalButton"
				onClick={() => setShowModal(true)}
			>
				+Add
			</button>
		</>
	);
}

export default AddButton;
