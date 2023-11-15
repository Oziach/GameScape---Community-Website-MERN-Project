import { useParams, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { CommunityContext } from "./CommunityContext";
import GameCard from "./GameCard";

function GameSearchResultsPage(){

    const {text} = useParams();
    const [communities, setCommunities] = useState([])
    const {setCommunityName} = useContext(CommunityContext);

    useEffect(()=>{
        setCommunityName(null);
        axios.get('/communities?search='+text)
        .then((res)=>{
            setCommunities(res.data);
        })
    },[])

    return(
        <div>
        {
            communities.map(community=>{
                return(
                    <Link to={'/community/'+community.name} className="text-decoration-none">
                        <GameCard {...community} />
                    </Link>

                )

            })
        }
        </div>
    )
    

}

export default GameSearchResultsPage;