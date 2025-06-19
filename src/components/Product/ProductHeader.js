import "./Product.css";
import { getUserFromToken } from "../../utils/authUtils";

function ProductHeader() {

    const user = getUserFromToken();
    return (
        <div className="productContainer">
            <div className="itemParagraph"><p>Name</p></div>
            <div className="itemParagraph"><p>Quantity</p></div>
            <div className="itemParagraph"><p>Start Quantity</p></div>
            <div className="itemParagraph"><p>Type</p></div>
            <div className="itemParagraph"><p>Price per Unit</p></div>
            <div className="itemParagraph"><p>Expiry Date</p></div>
            <div className="itemParagraph"><p>Date Added</p></div>
            <div className="itemParagraph"><p>Category</p></div>
            <div className="itemParagraph"><p>Vendor</p></div>

            {user?.role === "MANAGER" && (
					<>
                        <div className="itemParagraph"><p></p></div>
                        <div className="itemParagraph"><p></p></div>
                        <div className="itemParagraph"><p></p></div>
                    </>
			)}

            {user?.role === "ADMIN" && (
					<>
                        <div className="itemParagraph"><p></p></div>
                        <div className="itemParagraph"><p></p></div>
                        <div className="itemParagraph"><p></p></div>
                        <div className="itemParagraph"><p></p></div>
                        <div className="itemParagraph"><p></p></div>
                    </>
			)}

        </div>
    );
}

export default ProductHeader;