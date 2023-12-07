import { useState } from 'react'
import './PlayerCard.scss'

export default function PlayerCard({ playerName, playerSymbol, isActive, editFunction }) {

    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(playerName)

    function handleOnEdit() {
        setEditing(prevEdit => !prevEdit)

        if (editing) {
            editFunction(playerSymbol, name)
        }
    }

    return (
        <li className={`player-list ${isActive ? 'active' : undefined}`}>
            <span className='player'>
                {!editing ?
                    <span className='player-name'>{name === '' ? playerName : name}</span>
                    : <input
                        required
                        type="text"
                        name='name'
                        value={name}
                        onChange={(event) => setName(prevName => event.target.value)}
                    />
                }
                <span className='player-symbol'>{playerSymbol}</span>
            </span>
            <button onClick={handleOnEdit}>{editing ? "Save" : "Edit"}</button>
        </li>
    )
}
