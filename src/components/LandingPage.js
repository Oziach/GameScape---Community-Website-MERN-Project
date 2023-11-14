import GameCard from "./GameCard";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {CommunityContext} from "./CommunityContext"
import { Link } from "react-router-dom";

function LandingPage() {

    const [communities, setCommunities] = useState([])
    const {setCommunityName} = useContext(CommunityContext);

    useEffect(()=>{
        setCommunityName(null);
        axios.get('/communities')
        .then((res)=>{
            setCommunities(res.data);
        })
    },[])

    return(
        <div>
      
        {
            communities.map(community=>{
                return(
                    <Link to={'/community/'+community.name}>
                        <GameCard {...community} />
                    </Link>

                )

            })
        }
        {/* <div>
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
        </div> */}
        </div>
    )

}

export default LandingPage;