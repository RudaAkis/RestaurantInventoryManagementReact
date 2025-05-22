function AddProductButton({ setShowModal }) {
	return (
		<>
			<button
				className="openModalButton"
				onClick={() => setShowModal(true)}
			>
				+Add Product
			</button>
		</>
	);
}

export default AddProductButton;
