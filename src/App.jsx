import { useState, useEffect, useRef } from 'react'
import toPost from './style/Post';;


const URL = "http://localhost:3000/"

//  { }  [ ]  < >  < />  `` ||  `${name} is done`

function App() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [rerendGet, setRerendGet] = useState(false);

  function addName(e) {
    setName(e.target.value)
  }

  const addTask = () => {
    if (name !== "") { toPost(name) }
  }

  const Get = () => {
    const getData = fetch("http://localhost:3000/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(async (infos) => {
      const info = await infos.json();
      setData(info)
      console.log(data)
    })
  }

  useEffect(() => {
    Get();
  }, [rerendGet])


  const toPatch = (id, verify) => {

    setRerendGet(!rerendGet)

    const patchData = fetch(`${URL}users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "verify": !verify })
    }).then(async (data) => {
      const datas = await data.json()
      console.log(datas)
    }).catch((err) => {
      console.log(err.message)
    })
  }

  const toDelete = (id) => {
    setRerendGet(!rerendGet)
    const deleteData = fetch(`${URL}users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }
    ).then(async (data) => {
      const datas = await data.json()
      console.log(datas)
    })

  }

  return (

    <section className='container'>
      <form className='form'>
        <div className='add-task'>
          <input type="text" placeholder='enter a task' onChange={addName} />
          <button onClick={addTask}>Add</button>
        </div>

        <div className='list'>
          <ul>
            {
              data.map((user, id) => {
                return (
                  <li key={id}>
                    <p className={user.verify ? "done" : ""} >{user.name}</p>
                    <input
                      type="checkbox"
                      checked={user.verify ? "checked" : ""}
                      onChange={() => toPatch(user.id, user.verify)}
                    />
                    <button type="reset" onClick={() => toDelete(user.id)}>delete</button>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </form>
    </section>
  )
}

export default App

