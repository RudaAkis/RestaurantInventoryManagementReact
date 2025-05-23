import Modal from "./Modal";
import "./ConfirmDeleteModal.css";

function ConfirmModal({ title, message, onConfirm, onCancel }) {
	return (
		<Modal
			onClose={onCancel}
			child={
				<div className="confirmModal">
					<h2 className="title">{title}</h2>
					<p className="message">{message}</p>
					<div className="modalButtons">
						<button className="confirmBtn" onClick={onConfirm}>
							Proceed
						</button>
						<button className="cancelBtn" onClick={onCancel}>
							Cancel
						</button>
					</div>
				</div>
			}
		/>
	);
}

export default ConfirmModal;
