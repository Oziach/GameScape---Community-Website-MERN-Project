import { useContext } from "react";
import { CommunityContext } from "./CommunityContext";

function CommunityHeader(){

    const {communityName,title, iconImage} = useContext(CommunityContext);
    return(
        <div className='bgDarkGray d-flex align-items-center p-3 mt-0 mb-3 rounded-0 border border-2 border-danger border-end-0 border-start-0'>
          <img src={iconImage} alt="couldn't fetch image"
            className='rounded-2 logoSize bg-transparent border border-warning'
          />  
          <div className='px-5'>
            <h1 className='text-light my-0'>{title}</h1>
            <h5 className='lightGray'>community/{communityName}</h5>
          </div>  
        </div>
    )
}

export default CommunityHeader;