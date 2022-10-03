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
  const [score, setScore] = useState([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
  const [finalScore, setFinalScore] = useState(0);
  const [question, setQuestion] = useState(0);
  const [title, setTitle] = useState("Saya Mendapat Nilai 0 pada Gadget Internet and Game Addiction Test")
  const answers = ["Jarang", "Kadang-Kadang", "Sering", "Sering Sekali", "Selalu"];
  const ansScore = [1, 2, 3, 4, 5];

  const questionSets = [
    "Seberapa sering Anda menggunakan gadget internet/bermain game dengan lama yang melebihi waktu yang Anda inginkan? (Misalnya Anda hanya ingin online 1 jam, ternyata setelah berinternet/bermain game jadinya online 3 jam. Kondisi seperti ini seberapa sering Anda alami?)",
    "Seberapa sering Anda mengabaikan pekerjaan di rumah karena ingin online/ bermain gadget/ game lebih lama?",
    "Seberapa sering Anda lebih memilih kesenangan berinternet/ bermain gadget/game dibanding bercengkerama/ berkumpul dengan keluarga ",
    "Seberapa sering Anda menjalin hubungan baru dengan pengguna gadget/internet/ game online yang bersahabat?",
    "Seberapa sering orang-orang terdekat Anda (orang tua, suami/istri, saudara, teman akrab) menegur/mengeluh tentang waktu yang Anda habiskan di dunia online/bermain gadget/game?",
    "Seberapa sering tugas kantor atau tugas sekolah/kuliah Anda terbengkalai karena waktu yang Anda habiskan dengan berinternet/bermain gadget/ game?",
    "Seberapa sering Anda mengecek gadget/email/internet/game sebelum melakukan pekerjaan lain yang perlu? (Misalnya, sebelum memulai bekerja di kantor/sekolah apakah Anda mengecek email/internet/game? Setelah istirahat kerja/sekolah apakah Anda mengecek email/internet/ game sebelum waktu kerja/sekolah tiba kembali? Sebelum berangkat ke kampus/sekolah apakah Anda mengecek email/internet/ game? Seberapa sering?",
    "Seberapa sering kinerja atau produktivitas Anda berkurang karena gadget/Internet/bermain game?",
    "Seberapa sering Anda memberikan argumen “pembenaran” atau tidak berterus terang ketika seseorang menanyakan tentang apa yang Anda lakukan selama online/bermain gadget/game?",
    "Seberapa sering Anda menghalau pikiran-pikiran yang mengganggu tentang kehidupan Anda dengan pikiran-pikiran yang menyenangkan tentang internet/bermain gadget/game?",
    "Seberapa sering Anda memikirkan bahwa Anda akan online/bermain gadget/game lagi? (Misalnya dalam perjalanan pulang ke rumah, Anda sudah mewanti-wanti akan online/bermain gadget/game saat tiba di rumah). Seberapa sering ada pikiran seperti ini?",
    "Seberapa sering Anda merasa khawatir bahwa hidup tanpa gadget/Internet/ bermain game akan membosankan, hampa, dan tanpa kegembiraan?",
    "Seberapa sering Anda merasa jengkel, menggerutu, atau merasa sangat terganggu jika seseorang mengganggu saat Anda sedang online/bermain gadget/game?",
    "Seberapa sering Anda tidur terlambat di malam hari karena berinternet/ bermain gadget/game?",
    "Seberapa sering Anda merasa terikat dengan Internet saat off-line, atau membayangkan Anda sedang online/ bermain gadget/game?",
    "Seberapa sering Anda mengatakan atau bergumam dalam hati “sebentar lagi deh saya off” saat online/ bermain gadget/game?",
    "Seberapa sering Anda mencoba mengurangi porsi waktu yang Anda habiskan online/ bermain gadget/ game namun gagal?",
    "Seberapa sering Anda mencoba menyembunyikan/ berbohong berapa lama Anda telah online/ bermain gadget/game?",
    "Seberapa sering Anda lebih memilih menghabiskan banyak waktu dengan online/ bermain gadget/game dibanding pergi bersama orang lain?",
    "Seberapa sering Anda merasa depresi, tidak mood, atau grogi (nervous) saat Anda offline, yang mana akan hilang seketika ketika Anda kembali online/ bermain gadget/game?"
  ]

  const shareUrl = (window.location != window.parent.location)
  ? document.referrer + "tes-tingkat-stres-orang-tua/"
  : document.location.href + "tes-tingkat-stres-orang-tua/";

  const downloadUrl = shareUrl.match("asia") ? "https://play.google.com/store/apps/details?id=com.byasia.ruangortu" :
    shareUrl.match("roi") ? "https://play.google.com/store/apps/details?id=com.roi.ruangortu" : 
    shareUrl.match("hkbp") ? "https://play.google.com/store/apps/details?id=com.keluargahkbp" :
    shareUrl.match("lindungi") ? "https://play.google.com/store/apps/details?id=com.lindungianak.ruangortu" : "https://play.google.com/store/apps/details?id=com.ruangortu"

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
      ans = answers[ansScore.indexOf(nil)];
      x.push(ans);
      x.push(nil.toString());
      rows.push(x);
    })
    rows.push(["","","Total", finalScore.toString()]);
    doc.setFontSize(22);    
    doc.text(20,20, "Hasil Gadget Internet and Game Addiction Test");
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
    doc.text(20, doc.lastAutoTable.finalY + 8, "Tingkat ketergantungan Anda: ");
    doc.setFont(undefined, 'bold');
    doc.text(105, doc.lastAutoTable.finalY + 8, (finalScore <= 49 ? "Rendah" : "Berat"))

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(20, doc.lastAutoTable.finalY + 20, "Semakin tinggi nilai Anda, semakin tinggi ketergantungan Anda dengan Gadget Internet dan Game.");
    doc.text(20, doc.lastAutoTable.finalY + 25, "Nilai Minimum = 20. Nilai Maksimum = 100.");

    doc.setFontSize(8);
    doc.setFont(undefined, 'italic');
    doc.text(20, doc.lastAutoTable.finalY + 30, "Dr. David Greenfield, Center for Internet and Technology Addiction (Modified by dr.Lahargo Kembaren, SpKJ)");
    
    doc.save('Hasil_Gadget_Internet_and_Game_Addiction_Test.pdf');
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
      <header className="App-header">
        <h1>Gadget Internet and Game Addiction Test</h1>
      </header>
      <div className="App-body">

      {pgIdx === 1 ? 
        <div className="App-body-intro">
          <h4>Ponsel pintar atau gadget merupakan salah satu penyebab banyak orang lupa waktu saat sudah menggunakannya. Para ahli juga telah mengungkapkan bahaya ketagihan gadget. Namun, durasi penggunaan seperti apakah yang sudah bisa dianggap kecanduan?</h4>
          <br/>
          <h4>Apakah menggunakan gadget lebih dari 3 jam setiap hari sudah masuk kategori kecanduan? Menurut David Greenfeld, asisten profesor psikologi dari Connecticut Schol of Medicine, tidak ada pedoman dasar untuk mengukur tingkat kecanduan pada gadget.</h4>
          <br/>
          <h4>Meski begitu, ia dan timnya mengembangkan sebuah tes berupa 15 pertanyaan untuk mengukur tingkat ketergantungan seseorang pada gadget. Tes yang disebut Smartphone Compulsion Test ini dibuat dari pengamatan selama 12 tahun.</h4>
          <br/>
          <h4>Mari kita bagikan link ini ke keluarga dan handai taulan kita, juga ikuti test ini, dan bagikan hasilnya ke mereka melalui sosial media dan instant messaging.</h4>
          <button id="start" onClick={()=> {
            setPgIdx(2);
          }}>Mulai</button>
          <div className="App-body-intro-bottom"><h5>Dr. David Greenfield, Center for Internet and Technology Addiction (Modified by dr.Lahargo Kembaren, SpKJ)</h5>
          {/* <h5>{"Berry, JD, & Jones, W,H, (1995) The Parental Stress Scale : initial psychometric evidence. Journal of Social and Personal Relationships, 12, 463 - 472."}</h5> */}
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
            <label><input type="radio" value={ansScore[index]} name="answer" checked={score[question] === ansScore[index]} /> {value}</label>
          ))}
          {/* <label><input type="radio" value={[1,2,5,6,7,8,17,18].includes(question+1) ? 5 : 1} name="answer" checked={score[question] === ([1,2,5,6,7,8,17,18].includes(question+1) ? 5 : 1)} /> Sangat tidak setuju</label>
          <label><input type="radio" value={[1,2,5,6,7,8,17,18].includes(question+1) ? 4 : 2} name="answer" checked={score[question] === ([1,2,5,6,7,8,17,18].includes(question+1) ? 4 : 2)} /> Tidak setuju</label>
          <label><input type="radio" value={3} name="answer" checked={score[question] === 3} /> Antara setuju dan tidak setuju</label>
          <label><input type="radio" value={[1,2,5,6,7,8,17,18].includes(question+1) ? 2 : 4} name="answer" checked={score[question] === ([1,2,5,6,7,8,17,18].includes(question+1) ? 2 : 4)} /> Setuju</label>
          <label><input type="radio" value={[1,2,5,6,7,8,17,18].includes(question+1) ? 1 : 5} name="answer" checked={score[question] === ([1,2,5,6,7,8,17,18].includes(question+1) ? 1 : 5)} /> Sangat setuju</label> */}
        </div>
        {question < 19 ? <button id="next" onClick={()=> {
          setQuestion(question+1);
        }}>Berikutnya</button>
        : <button id="submit" onClick={()=> {
          var x = 0;
          score.forEach(element => {
            x+=element;
          });
          setTitle("Saya telah mengikuti Gadget Internet and Game Addiction Test dan mendapat nilai " + x + ". Coba cek tingkat ketergantungan kamu di " + shareUrl + " - dan Download aplikasi Digital Parenting di " + downloadUrl + ".\n");
          setFinalScore(x);
          setPgIdx(3);
        }}>Submit</button>
      }
      </div> :
      <div className="App-body-result">
        <p>Nilai Anda:</p>
        <h2>{finalScore}</h2>
        <h3>Tingkat ketergantungan Anda {finalScore <= 49 ? "Rendah" : finalScore <= 79 ? "Sedang" : "Berat"}.</h3>
        <h4>Semakin tinggi nilai Anda, semakin tinggi tingkat ketergantungan Anda dengan Gadget Internet dan Game.</h4>
        <h4>Nilai Minimum: 20, Nilai Maksimum: 100</h4>
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
          <h5>{"Dr. David Greenfield, Center for Internet and Technology Addiction (Modified by dr.Lahargo Kembaren, SpKJ)"}</h5>
        </div>
      </div>
      }
      </div>
    </div>
  );
}

export default App;
