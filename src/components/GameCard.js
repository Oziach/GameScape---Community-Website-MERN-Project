function GameCard(props) {

    
    return(
        <div className="bgDarkGray rounded-2 hoverDanger d-inline-block border border-warning gameCard m-2 p-2 pb-1 overflow-hidden">
            
            <img src={props.cardImage}
                className="rounded-2"/>

            <div className="text-center fw-bold">
                {props.title}
            </div>
        </div>
        
    )
}

export default GameCard;