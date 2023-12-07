import './Log.scss'


function LogCard({ turn }) {
    return (
        <p className='log-card'>
            {`${turn.playerSymbol} selected the square ${turn.clickedSquare.rowIndex}.${turn.clickedSquare.elementIndex}`}
        </p>
    )
}

export default function Log({ gameTurns }) {

    return (
        <div className='log-container'>
            {gameTurns.map((turn) => {
                return (
                    <LogCard turn={turn} key={`${turn.clickedSquare.rowIndex}${turn.clickedSquare.elementIndex}`} />
                )
            })}
        </div>
    )
}
