// { }
import React from 'react'



const toPost = async (dataPost) => {

    const rep = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "name": dataPost, "verify": false })
    }
    )
    console.log(rep)
}

export default toPost;