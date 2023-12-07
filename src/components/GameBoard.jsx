import './GameBoard.scss'

export default function GameBoard({ gameBoard, onSquareClick }) {


    return (
        <div className='game-board'>
            {
                gameBoard.map((row, rowIndex) => (
                    row.map((element, elementIndex) => {
                        return <button disabled={element != null} key={elementIndex} onClick={() => onSquareClick(rowIndex, elementIndex)}>{element}</button>
                    })
                ))
            }
        </div>
    )
}
