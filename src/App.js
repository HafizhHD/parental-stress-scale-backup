import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const [pgIdx, setPgIdx] = useState(1);
  const [score, setScore] = useState([5,5,1,1,5,5,5,5,1,1,1,1,1,1,1,1,5,5]);
  const [finalScore, setFinalScore] = useState(0);
  const [question, setQuestion] = useState(0);

  const questionSets = [
    "1. Saya bahagia dengan peran saya sebagai orang tua",
    "2. Saya akan melakukan apapun untuk anak-anak saya jika memang dibutuhkan",
    "3. Menjaga anak-anak terkadang memakan waktu dan energi lebih banyak daripada yang seharusnya saya berikan",
    "4. Saya terkadang khawatir apakah saya telah melakukan yang terbaik untuk anak-anak saya",
    "5. Saya merasa dekat dengan anak-anak saya",
    "6. Saya menikmati waktu bersama anak-anak saya",
    "7. Anak-anak saya adalah sumber kasih sayang yang penting bagi saya",
    "8. Memiliki anak memberikan saya pandangan masa depan yang lebih pasti dan optimis",
    "9. Sumber utama stres pada hidup saya adalah anak-anak saya",
    "10. Memiliki anak hanya menyisakan sedikit waktu dan fleksibilitas pada hidup saya",
    "11. Memiliki anak telah menjadi beban finansial",
    "12. Saya kesulitan dalam menyeimbangkan tanggung jawab yang berbeda-beda karena anak-anak saya",
    "13. Kelakuan anak-anak saya sering membuat saya malu atau stres",
    "14. Saya memilih untuk tidak memiliki anak jika saya dapat memutarbalikkan waktu",
    "15. Saya merasa kewalahan dengan tanggung jawab sebagai orang tua",
    "16. Memiliki anak telah menjadi batasan pada pilihan dan kontrol hidup saya",
    "17. Saya merasa puas sebagai orang tua",
    "18. Saya merasa anak-anak saya membuat saya senang"
  ]

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <header className="App-header">
        <h1>Tes Tingkat Stres Orang Tua</h1>
      </header>
      <div className="App-body">

      {pgIdx === 1 ? 
        <div className="App-body-intro">
          <h3>Ukur tingkat stres Anda sebagai Orang Tua.</h3>
          <button id="start" onClick={()=> {
            setPgIdx(2);
          }}>Mulai</button>
        </div> :
      pgIdx === 2 ? 
      <div className="App-body-choice">
        <h3>{questionSets[question]}</h3>
        <div className="App-body-choice-select" onChange={(e) => {
          var p = score.slice();
          p[question] = Number.parseInt(e.target.value);
          setScore(p);
        }}>
          <label><input type="radio" value={[1,2,5,6,7,8,17,18].includes(question+1) ? 5 : 1} name="answer" checked={score[question] === ([1,2,5,6,7,8,17,18].includes(question+1) ? 5 : 1)} /> Sangat tidak setuju</label>
          <label><input type="radio" value={[1,2,5,6,7,8,17,18].includes(question+1) ? 4 : 2} name="answer" checked={score[question] === ([1,2,5,6,7,8,17,18].includes(question+1) ? 4 : 2)} /> Tidak setuju</label>
          <label><input type="radio" value={3} name="answer" checked={score[question] === 3} /> Antara setuju dan tidak setuju</label>
          <label><input type="radio" value={[1,2,5,6,7,8,17,18].includes(question+1) ? 2 : 4} name="answer" checked={score[question] === ([1,2,5,6,7,8,17,18].includes(question+1) ? 2 : 4)} /> Setuju</label>
          <label><input type="radio" value={[1,2,5,6,7,8,17,18].includes(question+1) ? 1 : 5} name="answer" checked={score[question] === ([1,2,5,6,7,8,17,18].includes(question+1) ? 1 : 5)} /> Sangat setuju</label>
        </div>
        {question < 17 ? <button id="next" onClick={()=> {
          setQuestion(question+1);
        }}>Berikutnya</button>
        : <button id="submit" onClick={()=> {
          var x = 0;
          score.forEach(element => {
            x+=element;
          });
          setFinalScore(x);
          setPgIdx(3);
        }}>Submit</button>
      }
      </div> :
      <div className="App-body-result">
        <p>Nilai Kamu:</p>
        <h2> {finalScore}</h2>
        <button id="restart" onClick={()=> {
          setQuestion(0);
          setPgIdx(1);
        }}>Ulang</button>
      </div>
      }
      </div>
    </div>
  );
}

export default App;
