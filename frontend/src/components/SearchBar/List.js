import { React, useState } from 'react'
import data from "./Dummy.json"

function List(props) {
    return (
        <ul>
            {data.map((item) => (
                <li key={item.id}>{item.username}</li>
            ))}
        </ul>
    )
}

export default List;