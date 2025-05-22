import "./Modal.css";

function Modal({ onClose, formChild }) {
	//Prevents the modal from closing if the modalContainer is clicked
	const stopPropagation = (e) => e.stopPropagation();

	return (
		<div className="modalBackground" onClick={onClose}>
			<div className="modalContainer" onClick={stopPropagation}>
				<button className="modalCloseButton" onClick={onClose}>
					✖
				</button>
				{formChild}
			</div>
		</div>
	);
}

export default Modal;
