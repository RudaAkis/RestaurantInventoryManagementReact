import { useState } from "react";
import Modal from "../Modal";
import ProdcutRefillForm from "./ProductRefillForm";

function ProductRefillButton({refillProduct}) {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () =>{
        setShowModal(true);
    }

    return (
        <>
            <button onClick={handleClick}>Refill</button>

            {showModal && (
                <Modal 
                    onClose={() => setShowModal(false)} 
                    child={
                    <ProdcutRefillForm 
                        refillProduct={refillProduct}
                        closeModal={() => setShowModal(false)}
                    />}
                />
            )}
        </>
    )
}

export default ProductRefillButton;