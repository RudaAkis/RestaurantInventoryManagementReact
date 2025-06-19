import { useState } from "react";
import Modal from "../Modal";
import ProdcutRefillForm from "./ProductRefillForm";
import addIcon from '../../images/addIcon.png';

function ProductRefillButton({refillProduct}) {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () =>{
        setShowModal(true);
    }

    return (
        <>
            <button className="productButton" onClick={handleClick}> <img className="iconImage" src={addIcon} alt="-"/> </button>

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