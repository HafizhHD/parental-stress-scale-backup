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
  const [question, setQuestion] = useState(-1);
  const [title, setTitle] = useState("Saya Mendapat Nilai 0 pada Gadget Internet and Game Addiction Test")
  const [name, setName] = useState('');
  const [kelas, setKelas] = useState(1);
  const [sekolah, setSekolah] = useState('');
  const answers = ["Jarang", "Kadang-Kadang", "Sering", "Sangat Sering", "Selalu"];
  const ansScore = [1, 2, 3, 4, 5];

  const questionSets = [
    "Seberapa sering Anda menggunakan gadget/internet/game/sosmed dengan lama yang melebihi waktu yang Anda inginkan? (Misalnya Anda hanya ingin online 1 jam, ternyata setelah bermain gadget/internet/game/sosmed jadinya online 3 jam. Kondisi seperti ini seberapa sering Anda alami?)",
    "Seberapa sering Anda mengabaikan pekerjaan di rumah karena ingin bermain gadget/internet/game/sosmed lebih lama?",
    "Seberapa sering Anda lebih memilih kesenangan bermain gadget/internet/game/sosmed dibanding bercengkerama/berkumpul dengan keluarga?",
    "Seberapa sering Anda menjalin hubungan baru dengan pengguna gadget/internet/game/sosmed yang bersahabat?",
    "Seberapa sering orang-orang terdekat Anda (orang tua, suami/istri, saudara, teman akrab) menegur/mengeluh tentang waktu yang Anda habiskan di dunia online/bermain gadget/internet/game/sosmed?",
    "Seberapa sering tugas kantor atau tugas sekolah/kuliah Anda terbengkalai karena waktu yang Anda habiskan dengan berinternet/bermain gadget/game/sosmed?",
    "Seberapa sering Anda mengecek gadget/email/internet/game/sosmed sebelum melakukan pekerjaan lain yang perlu? (Misalnya, sebelum memulai bekerja di kantor/sekolah apakah Anda mengecek gadget/email/internet/game/sosmed? Setelah istirahat kerja/sekolah apakah Anda mengecek gadget/email/internet/game/sosmed sebelum waktu kerja/sekolah tiba kembali? Sebelum berangkat ke kampus/sekolah apakah Anda mengecek gadget/email/internet/game/sosmed? Seberapa sering?",
    "Seberapa sering kinerja atau produktivitas Anda berkurang karena gadget/internet/bermain game/sosmed?",
    "Seberapa sering Anda memberikan argumen “pembenaran” atau tidak berterus terang ketika seseorang menanyakan tentang apa yang Anda lakukan selama bermain gadget/internet/game/sosmed?",
    "Seberapa sering Anda menghalau pikiran-pikiran yang mengganggu tentang kehidupan Anda dengan pikiran-pikiran yang menyenangkan tentang bermain gadget/internet game/sosmed?",
    "Seberapa sering Anda memikirkan bahwa Anda akan online/bermain gadget/game lagi? (Misalnya dalam perjalanan pulang ke rumah, Anda sudah mewanti-wanti akan online/bermain gadget/internet/game/sosmed saat tiba di rumah). Seberapa sering ada pikiran seperti ini?",
    "Seberapa sering Anda merasa khawatir bahwa hidup tanpa gadget/internet/bermain game/sosmed akan membosankan, hampa, dan tanpa kegembiraan?",
    "Seberapa sering Anda merasa jengkel, menggerutu, atau merasa sangat terganggu jika seseorang mengganggu saat Anda sedang online/bermain gadget/internet/game/sosmed?",
    "Seberapa sering Anda tidur terlambat di malam hari karena berinternet/ bermain gadget/internet/game/sosmed?",
    "Seberapa sering Anda merasa terikat dengan Internet saat off-line, atau membayangkan Anda sedang online/ bermain gadget/internet/game/sosmed?",
    "Seberapa sering Anda mengatakan atau bergumam dalam hati “sebentar lagi deh saya off” saat online/ bermain gadget/internet/game/sosmed?",
    "Seberapa sering Anda mencoba mengurangi porsi waktu yang Anda habiskan online/bermain gadget/internet/game/sosmed namun gagal?",
    "Seberapa sering Anda mencoba menyembunyikan/berbohong berapa lama Anda telah online/bermain gadget/internet/game/sosmed?",
    "Seberapa sering Anda lebih memilih menghabiskan banyak waktu dengan online/bermain gadget/internet/game/sosmed dibanding pergi bersama orang lain?",
    "Seberapa sering Anda merasa depresi, tidak mood, atau grogi (nervous) saat Anda offline, yang mana akan hilang seketika ketika Anda kembali online/bermain gadget/internet/game/sosmed?"
  ]

  const testUrl = (window.location != window.parent.location)
  ? document.referrer + "mengukur-tingkat-kecanduan-gadget-internet-anda/"
  : document.location.href + "mengukur-tingkat-kecanduan-gadget-internet-anda/";

  const shareUrl = (window.location != window.parent.location)
  ? document.referrer
  : document.location.href

  // const downloadUrl = shareUrl.match("asia") ? "https://play.google.com/store/apps/details?id=com.byasia.ruangortu" :
  //   shareUrl.match("roi") ? "https://play.google.com/store/apps/details?id=com.roi.ruangortu" : 
  //   shareUrl.match("hkbp") ? "https://play.google.com/store/apps/details?id=com.keluargahkbp" :
  //   shareUrl.match("family") ? "https://play.google.com/store/apps/details?id=com.lindungianak.ruangortu" : "https://play.google.com/store/apps/details?id=com.ruangortu"

  const hashtag = shareUrl.match("asia") ? "#ruangortubyasia" :
    shareUrl.match("roi") ? "#ruangortuindonesia" : 
    shareUrl.match("hkbp") ? "#keluargahkbp" :
    shareUrl.match("family") ? "#ruangkeluarga" : "#ruangortu"

  const webName = shareUrl.match("asia") ? "Ruang ORTU by ASIA" :
    shareUrl.match("roi") ? "Ruang Ortu Indonesia" : 
    shareUrl.match("hkbp") ? "Keluarga HKBP" :
    shareUrl.match("family") ? "Ruang Keluarga" : "Ruang Ortu"

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
    doc.text(20,25, "Nama   : " + name);
    doc.text(20,30, "Sekolah: " + sekolah);
    doc.autoTable(col, rows, { startY: 32, margin: {left: 20, right: 20}, willDrawCell: function(data) {
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
    doc.text(105, doc.lastAutoTable.finalY + 8, (finalScore <= 49 ? "Rendah" : finalScore <= 79 ? "Sedang" : "Berat"))

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(20, doc.lastAutoTable.finalY + 15, "Semakin tinggi nilai Anda, semakin tinggi ketergantungan Anda terhadap Gadget Internet dan Game.");
    doc.text(20, doc.lastAutoTable.finalY + 20, "Nilai Minimum = 20. Nilai Maksimum = 100.");

    doc.setFontSize(8);
    doc.setFont(undefined, 'italic');
    doc.text(20, doc.lastAutoTable.finalY + 27, "Referensi: dr. Lahargo Kembaren SpJk, Psikiater dan Kepala Instalasi Rehabilitasi Psikososial");
    doc.text(34, doc.lastAutoTable.finalY + 30, "RS. Jiwa dr. H. Marzoeki Mahdi, Bogor");
    
    doc.save('Hasil_Gadget_Internet_and_Game_Addiction_Test.pdf');
  }

  const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
  
    const containerStyles = {
      height: 20,
      width: '60%',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      marginLeft: '20%',
      marginRight: '20%'
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right'
    }
  
    const labelStyles = {
      padding: 5,
      color: 'black',
      fontWeight: 'bold'
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{completed}%</span>
        </div>
      </div>
    );
  };

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
        <h1>Gadget Internet and Game Addiction Test</h1>
      </header> */}
      <div className="App-body">

      {pgIdx === 1 ? 
        <div className="App-body-intro">
          <h4>Kecanduan sering kali membuat orang tidak menyadari apa yang sedang terjadi pada dirinya. Demikian juga pengguna gadget (gawai), juga acap tak menyadari bahwa sebenarnya dia sedang kecanduan.</h4>
          <h4>Kondisi itu bermasalah. Menurut para ahli, kecanduan gadget bisa menyebabkan efek euforia yang sama dengan perilaku kecanduan lainnya, seperti berjudi atau melihat tontonan pornografi.</h4>
          <h4>Berdasarkan hasil penelitian, kecanduan gadget dapat mengubah zat kimia otak yang pada akhirnya memengaruhi kondisi fisik, psikologis, dan perilaku seseorang.</h4>
          <h4>Seseorang dikatakan sudah kecanduan gadget, apabila sebagian besar waktunya dihabiskan untuk menggunakan gadget, seperti smartphone, tablet, laptop, atau portable gaming device.</h4>
          <h4>Istilah untuk kondisi ini adalah nomophobia (no mobile phobia), yang berarti ketakutan untuk aktivitas sehari-hari tanpa smartphone maupun gadget dalam bentuk lainnya.</h4>
          <h4>Anda dapat mengukur tingkat kecanduan terhadap gadget dengan menjawab pertanyaan-pertanyaan berikut:</h4>
          <button id="start" onClick={()=> {
            setPgIdx(2);
          }}>Mulai</button>
          <div className="App-body-intro-bottom"><h5>Referensi:</h5>
          <h5>{"dr. Lahargo Kembaren SpJk, Psikiater dan Kepala Instalasi Rehabilitasi Psikososial RS. Jiwa dr. H. Marzoeki Mahdi, Bogor"}</h5>
        </div></div> :
      pgIdx === 2 ? 
        question === -1 ? <div className="App-body-choice"><div className="App-body-intro-form">
          <div className="App-body-intro-form-left">
            <p>Nama:</p>
            <p>Kelas:</p>
            <p>Sekolah:</p>
          </div>
          <div className="App-body-intro-form-right">
            <input type="text" placeholder="Nama" name="name" value={name} onChange={(e) => {
              setName(e.currentTarget.value);
            }}/>
            <select value={kelas} onChange={(e) => {
              setKelas(e.currentTarget.value);
            }}>
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(x => {
                return <option value={x}>{x}</option>
              })}
            </select>
            <input type="text" placeholder="SD Contoh 1" name="sekolah" value={sekolah} onChange={(e) => {
              setSekolah(e.currentTarget.value);
            }}/>
          </div>
        </div>
        <button id="next" onClick={()=> {
          setQuestion(question+1);
        }}>Berikutnya</button></div> : 
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
          let candu = finalScore <= 49 ? "Rendah" : finalScore <= 79 ? "Sedang" : "Berat"
          setTitle("Saya, " + name + ", Kelas " + kelas.toString() + ", sekolah di " + sekolah + ", telah mengikuti test kecanduan gadget di " + webName + ".\nHasilnya Kecanduan " + candu + ".\nApa hasil tes kamu? Klik " + testUrl + " untuk melakukan tes kecanduan gadget.\nTerima kasih.\n" + hashtag);
          setFinalScore(x);
          setPgIdx(3);
        }}>Submit</button>
      }
      </div> :
      <div className="App-body-result">
        <h3>Tingkat ketergantungan Anda:</h3>
        {/* <ProgressBar key={1} bgcolor={finalScore <= 49 ? "green" : finalScore <= 79 ? "yellow" : "red"} completed={Math.floor((finalScore-20)*10/8)} /> */}
        <h2>{finalScore <= 49 ? "Rendah" : finalScore <= 79 ? "Sedang" : "Berat"}.</h2>
        <h4>{finalScore <= 49 ? "Anda adalah pengguna gadget/internet/game/sosmed sebagaimana umumnya. Anda mungkin terkadang menggunakan gadget/internet/game/sosmed sedikit agak lama namun anda masih bisa mengontrolnya."
          : finalScore <= 79 ? "Anda terkadang mengalami permasalahan dengan penggunaan gadget/internet/game/sosmed yang berlebihan. Anda harus mulai mempertimbangkan dampak buruknya bagi anda."
          : "Penggunaan gadget/internet/game/sosmed anda menyebabkan masalah yang sangat besar bagi kehidupan anda. Mulailah memahami apakah anda mempunyai masalah dalam menjalani hidup dan penggunan gadget/internet/game/sosmed yang berlebih justru hanya akan menambah parah keadaan anda. Segeralah mencari pertolongan, ada baiknya anda berkonsultasi dengan psikiater di kota anda."}</h4>
        <button id="download" onClick={download}>Download Hasil</button>
        <button id="restart" onClick={()=> {
          setQuestion(-1);
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
            separator=" "
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
          <h5>{"dr. Lahargo Kembaren SpJk, Psikiater dan Kepala Instalasi Rehabilitasi Psikososial RS. Jiwa dr. H. Marzoeki Mahdi, Bogor"}</h5>
        </div>
      </div>
      }
      </div>
    </div>
  );
}

export default App;
