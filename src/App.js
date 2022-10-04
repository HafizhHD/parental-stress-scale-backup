import logo from './logo.svg';
import './App.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React, {useState} from 'react';
import {EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton, 
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  EmailIcon} from 'react-share';

function App() {
  const [pgIdx, setPgIdx] = useState(1);
  const [score, setScore] = useState([5,5,1,1,5,5,5,5,1,1,1,1,1,1,1,1,5,5]);
  const [finalScore, setFinalScore] = useState(0);
  const [question, setQuestion] = useState(0);
  const [title, setTitle] = useState("Saya Mendapat Nilai 0 pada Tes Tingkat Stres Orang Tua")
  const answers = ["Sangat tidak setuju", "Tidak setuju", "Antara setuju dan tidak setuju", "Setuju", "Sangat setuju"];
  const ansScore = [1, 2, 3, 4, 5];
  const ansInsScore = [5, 4, 3, 2, 1];

  const questionSets = [
    "Saya bahagia dengan peran saya sebagai orang tua",
    "Saya akan melakukan apapun untuk anak-anak saya jika memang dibutuhkan",
    "Menjaga anak-anak terkadang memakan waktu dan energi lebih banyak daripada yang seharusnya saya berikan",
    "Saya terkadang khawatir apakah saya telah melakukan yang terbaik untuk anak-anak saya",
    "Saya merasa dekat dengan anak-anak saya",
    "Saya menikmati waktu bersama anak-anak saya",
    "Anak-anak saya adalah sumber kasih sayang yang penting bagi saya",
    "Memiliki anak memberikan saya pandangan masa depan yang lebih pasti dan optimis",
    "Sumber utama stres pada hidup saya adalah anak-anak saya",
    "Memiliki anak hanya menyisakan sedikit waktu dan fleksibilitas pada hidup saya",
    "Memiliki anak telah menjadi beban finansial",
    "Saya kesulitan dalam menyeimbangkan tanggung jawab yang berbeda-beda karena anak-anak saya",
    "Kelakuan anak-anak saya sering membuat saya malu atau stres",
    "Saya memilih untuk tidak memiliki anak jika saya dapat memutarbalikkan waktu",
    "Saya merasa kewalahan dengan tanggung jawab sebagai orang tua",
    "Memiliki anak telah menjadi batasan pada pilihan dan kontrol hidup saya",
    "Saya merasa puas sebagai orang tua",
    "Saya merasa anak-anak saya membuat saya senang"
  ]

  const testUrl = (window.location != window.parent.location)
  ? document.referrer + "tes-tingkat-stres-orang-tua/"
  : document.location.href + "tes-tingkat-stres-orang-tua/";

  const shareUrl = (window.location != window.parent.location)
  ? document.referrer
  : document.location.href;

  const downloadUrl = shareUrl.match("asia") ? "https://play.google.com/store/apps/details?id=com.byasia.ruangortu" :
    shareUrl.match("roi") ? "https://play.google.com/store/apps/details?id=com.roi.ruangortu" : 
    shareUrl.match("hkbp") ? "https://play.google.com/store/apps/details?id=com.keluargahkbp" :
    shareUrl.match("family") ? "https://play.google.com/store/apps/details?id=com.lindungianak.ruangortu" : "https://play.google.com/store/apps/details?id=com.ruangortu"

  const hashtag = shareUrl.match("asia") ? "#ruangortubyasia" :
    shareUrl.match("roi") ? "#ruangortuindonesia" : 
    shareUrl.match("hkbp") ? "#keluargahkbp" :
    shareUrl.match("family") ? "#ruangkeluarga" : "#ruangortu"

  const download = () => {
    var doc = new jsPDF();
    var col = ["No.","Pertanyaan","Jawaban","Nilai"];
    var rows = [];

    questionSets.forEach((value, index) => {
      var x = [];
      var i = index+1;
      x.push(i.toString());
      x.push(value);
      var ans = "", nil = score[index];
      if([1,2,5,6,7,8,17,18].includes(index+1)) ans = answers[ansInsScore.indexOf(nil)];
      else ans = answers[ansScore.indexOf(nil)];
      x.push(ans);
      x.push(nil.toString());
      rows.push(x);
    })
    rows.push(["","","Total", finalScore.toString()]);
    doc.setFontSize(25);    
    doc.text(20,20, "Hasil Tes Tingkat Stres Orang Tua");
    doc.setFontSize(12);
    doc.autoTable(col, rows, { startY: 30, margin: {left: 20, right: 20}, willDrawCell: function(data) {
      var doc = data.doc;
      var rows = data.table.body;
      if (data.row.index === rows.length - 1) {
        doc.setFont(undefined, 'bold');
        doc.setFillColor(150, 245, 170);
      }
    }});

    doc.setFontSize(18);
    doc.text(20, doc.lastAutoTable.finalY + 8, "Tingkat stres Anda: ");
    doc.setFont(undefined, 'bold');
    doc.text(85, doc.lastAutoTable.finalY + 8, (finalScore <= 36 ? "Rendah" : finalScore <= 54 ? "Sedang" : finalScore <= 72 ? "Tinggi" : "Sangat Tinggi"))

    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(20, doc.lastAutoTable.finalY + 15, "Semakin tinggi nilai Anda, semakin tinggi tingkat stres Anda sebagai orang tua.");
    doc.text(20, doc.lastAutoTable.finalY + 20, "Nilai Minimum = 18. Nilai Maksimum = 90.");

    doc.setFontSize(8);
    doc.setFont(undefined, 'italic');
    doc.text(20, doc.lastAutoTable.finalY + 27, "Referensi: Berry, JD, & Jones, W,H, (1995) The Parental Stress Scale : initial psychometric evidence.");
    doc.text(34, doc.lastAutoTable.finalY + 30, "Journal of Social and Personal Relationships, 12, 463 - 472.");
    
    doc.save('Hasil_Tes_Tingkat_Stres_Orang_Tua.pdf');
  }

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
      {/* <header className="App-header">
        <h1>Tes Tingkat Stres Orang Tua</h1>
      </header> */}
      <div className="App-body">

      {pgIdx === 1 ? 
        <div className="App-body-intro">
          <h3>Ukur tingkat stres Anda sebagai Orang Tua.</h3>
          <h4>Semakin tinggi nilai Anda, semakin tinggi tingkat stres Anda sebagai orang tua.</h4>
          <h4>Nilai Minimum: 18, Nilai Maksimum: 90</h4>
          <button id="start" onClick={()=> {
            setPgIdx(2);
          }}>Mulai</button>
          <div className="App-body-intro-bottom"><h5>Referensi:</h5>
          <h5>{"Berry, JD, & Jones, W,H, (1995) The Parental Stress Scale : initial psychometric evidence. Journal of Social and Personal Relationships, 12, 463 - 472."}</h5>
        </div></div> :
      pgIdx === 2 ? 
      <div className="App-body-choice">
        <h3>{(question+1) + ". " + questionSets[question]}</h3>
        <div className="App-body-choice-select" onChange={(e) => {
          var p = score.slice();
          p[question] = Number.parseInt(e.target.value);
          setScore(p);
        }}>
          {answers.map((value, index) => (
            <label><input type="radio" value={[1,2,5,6,7,8,17,18].includes(question+1) ? ansInsScore[index] : ansScore[index]} name="answer" checked={score[question] === ([1,2,5,6,7,8,17,18].includes(question+1) ? ansInsScore[index] : ansScore[index])} /> {value}</label>
          ))}
          {/* <label><input type="radio" value={[1,2,5,6,7,8,17,18].includes(question+1) ? 5 : 1} name="answer" checked={score[question] === ([1,2,5,6,7,8,17,18].includes(question+1) ? 5 : 1)} /> Sangat tidak setuju</label>
          <label><input type="radio" value={[1,2,5,6,7,8,17,18].includes(question+1) ? 4 : 2} name="answer" checked={score[question] === ([1,2,5,6,7,8,17,18].includes(question+1) ? 4 : 2)} /> Tidak setuju</label>
          <label><input type="radio" value={3} name="answer" checked={score[question] === 3} /> Antara setuju dan tidak setuju</label>
          <label><input type="radio" value={[1,2,5,6,7,8,17,18].includes(question+1) ? 2 : 4} name="answer" checked={score[question] === ([1,2,5,6,7,8,17,18].includes(question+1) ? 2 : 4)} /> Setuju</label>
          <label><input type="radio" value={[1,2,5,6,7,8,17,18].includes(question+1) ? 1 : 5} name="answer" checked={score[question] === ([1,2,5,6,7,8,17,18].includes(question+1) ? 1 : 5)} /> Sangat setuju</label> */}
        </div>
        {question < 17 ? <button id="next" onClick={()=> {
          setQuestion(question+1);
        }}>Berikutnya</button>
        : <button id="submit" onClick={()=> {
          var x = 0;
          score.forEach(element => {
            x+=element;
          });
          setTitle("Saya, sebagai orang tua telah ikuti tes tingkat stress pengasuhan anak dan mendapat nilai " + x + ". Coba cek tingkat stres kamu di " + testUrl + " - dan Download aplikasi Digital Parenting di " + downloadUrl + ".\n" + hashtag);
          setFinalScore(x);
          setPgIdx(3);
        }}>Submit</button>
      }
      </div> :
      <div className="App-body-result">
        <p>Nilai Anda:</p>
        <h2>{finalScore}</h2>
        <h3>Tingkat stres Anda {finalScore <= 36 ? "Rendah" : finalScore <= 54 ? "Sedang" : finalScore <= 72 ? "Tinggi" : "Sangat Tinggi"}.</h3>
        <h4>Semakin tinggi nilai Anda, semakin tinggi tingkat stres Anda sebagai orang tua.</h4>
        <h4>Nilai Minimum: 18, Nilai Maksimum: 90</h4>
        <button id="download" onClick={download}>Download Hasil</button>
        <button id="restart" onClick={()=> {
          setQuestion(0);
          setPgIdx(1);
        }}>Ulang</button>

        <div className="App-body-result-share">
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="App-body-result-share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="App-body-result-share-button"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="App-body-result-share-button"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <TelegramShareButton
            url={shareUrl}
            title={title}
            className="App-body-result-share-button"
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </div>
        <div className="App-body-result-bottom"><h5>Referensi:</h5>
          <h5>{"Berry, JD, & Jones, W,H, (1995) The Parental Stress Scale : initial psychometric evidence. Journal of Social and Personal Relationships, 12, 463 - 472."}</h5>
        </div>
      </div>
      }
      </div>
    </div>
  );
}

export default App;
