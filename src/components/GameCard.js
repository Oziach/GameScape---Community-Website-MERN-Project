function GameCard() {

    return(
        <div className="bgDarkGray rounded-2 hoverDanger d-inline-block border border-warning gameCard m-2 p-2 pb-1 overflow-hidden">
            
            <img src="https://images.launchbox-app.com/418323ec-c449-4e63-94e7-cefac4c6e8a8.jpg"
                className="rounded-2"/>

            <div className="text-center fw-bold">
                Old School Runescape
            </div>
        </div>
        
    )
}

export default GameCard;