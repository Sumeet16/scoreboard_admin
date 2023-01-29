import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";

function App() {
  const [score, setScore] = useState([]);
  const [currentScoreWin, setcurrentScoreWin] = useState(0);
  const [currentScoreLose, setcurrentScoreLose] = useState(0);
  const getScore = async () => {
    const res = await axios("https://demo-server-scoreboard.vercel.app/getScore", {
      method: "GET",
    });
    setScore(res.data.scores);
  };

  useEffect(() => {
    getScore();
  }, []);

  const updateScore = async (name) => {
    const res = await fetch("https://demo-server-scoreboard.vercel.app/updateScore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentScoreLose, currentScoreWin, name
      })
    })

    const data = await res.json();
    if (data.score) {
      alert("Score Updated!!!")
      location.reload()
    }
  }


  return (
    <div className="App">
      <div className="cont">
        <div className="heading">
          <h2>Win</h2>
          <h2>Lose</h2>
          <h2>Point</h2>
        </div>
        <div className="cont_inner">
          {score.map((elem, index) => {
            return (
              <div className="team_div">
                <p>{elem.team}</p>
                <input type="text" name="win" id="win" defaultValue={elem.win} onChange={(event) => { setcurrentScoreWin(event.target.value) }} />
                <input type="text" name="lose" id="lose" defaultValue={elem.lose} onChange={(event) => { setcurrentScoreLose(event.target.value) }} />
                <input type="text" name="lose" id="lose" defaultValue={elem.point}/>
                <button type="submit" onClick={() => {updateScore(elem.team)}}>✅</button>
              </div>
            )
          })}
          <br />
        </div>
      </div>
    </div>
  )
}

export default App
