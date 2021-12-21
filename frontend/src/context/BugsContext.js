import React, { createContext, useState } from 'react'

export const BugsContext = createContext()

export const BugsContextProvider = (props) => {
    const [bugs, setBugs] = useState([])
    const [resolvedBugs, setResolvedBugs] = useState([])
    const [members, setMembers] = useState([])

    const addBug = (bug) => {
        setBugs([...bugs, bug])
    }
    
    const removeBug = (bug) => {
        setBugs(bugs.filter((bag) => bag.id !== bug.id))
    }

    const resolveBug = (bug) => {
        setBugs(bugs.filter((bag) => bag.id !== bug.id))
        setResolvedBugs([...resolvedBugs, bug])
    }

    return (
        <BugsContext.Provider value={{bugs, setBugs, addBug, members, setMembers, removeBug, resolveBug, resolvedBugs, setResolvedBugs}}>
            {props.children}
        </BugsContext.Provider>
    )
}