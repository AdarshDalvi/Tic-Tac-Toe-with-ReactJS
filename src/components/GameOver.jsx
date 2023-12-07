import './GameOver.scss'
export default function GameOver({ winner, rematchFunction }) {
    return (
        <div id='game-over'>
            <h2>Game Over!</h2>
            <p>
                {
                    winner ?
                        `${winner} Won!`
                        : `It's a Draw!`
                }
            </p>
            <button onClick={rematchFunction}>Rematch</button>
        </div>
    )
}
