
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthScreenContext from "./AuthScreenContext";
import { useNavigate } from "react-router-dom";
import { CommunityContext } from "./CommunityContext";
import { DeleteContext } from "./DeleteContext";


function DeletePopup(){

    const{showDeletePopup, setShowDeletePopup} = useContext(DeleteContext);
    const visibleClass = showDeletePopup ? 'd-block' : 'd-none';

    function deletePost(){

    }

    return(
        <div       
            className={"row position-fixed position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center z-2 " + visibleClass} 
            style={{backgroundColor: 'rgba(0,0,0,0.44)'}} //faded background 
        >   
            <form className="col-lg-4 col-md-6 col-10 text-light bgBlack border border-2 border-danger mx-auto p-4 rounded-2">
                
                <h4 className="text-light mb-4">Are you sure?</h4>
                
                <div className="text-end">
                    <button
                        className="btn btn-outline-light mt-3 rounded-1 pb-2 px-4 mx-4 fw-bold"
                        onClick={()=>{
                            setShowDeletePopup(false);
                        }}>
                        Cancel
                    </button>

                    <button
                        className="btn btn-danger mt-3 rounded-1 pb-2 px-4 fw-bold"
                        onClick={()=>{deletePost();}}>
                        Delete
                    </button>
                </div>
                
            </form>
        </div>
    )
}


export default DeletePopup;