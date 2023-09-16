const EVENT_VAR = 'event';
const CUSTOM_EVENT = new Event(EVENT_VAR);
const dataBook = [];
const STORAGE_KEY = 'BOOKS';

var judulBuku = document.getElementById("judul")
var penulisBuku = document.getElementById("penulis")
var tahunBuku = document.getElementById("tahun")
var checkBuku = document.getElementById("checkbox")

var loadBuku = document.getElementById("udahDiBaca")




const saveToStorage = () => {
    if (typeof Storage !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataBook));
    } else {
        alert('Sorry! Update browser Anda untuk menikmati fitur ini..');
    }
}

const loadDataFromStorage = () => {
    if (typeof Storage !== "undefined") {
        const bookdat = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (bookdat !== null) {
            for (i of bookdat) {
                dataBook.push(i);
            }
        }
        document.dispatchEvent(CUSTOM_EVENT);
        console.log(bookdat);
        
    } else {
        alert('Sorry! Update browser Anda untuk menikmati fitur ini..');
    }
    
    
}



const dataObject = (id, judul, penulis, tahun, isComplete) => {
    return {
        id,
        judul,
        penulis,
        tahun,
        isComplete
    }
}

function tambahBuku() {
    const id = +new Date();
    const getJudul = judulBuku.value;
    const getPenulis = penulisBuku.value;
    const getTahun = tahunBuku.value;
    const isComplete = checkBuku.checked;

    const bookObject = dataObject(id, getJudul, getPenulis, parseInt(getTahun), isComplete);
    dataBook.push(bookObject);
    console.log(dataBook);
    document.dispatchEvent(CUSTOM_EVENT)

    saveToStorage();

}



document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        tambahBuku();
        
    })

    loadDataFromStorage();
})


function buatData(data) {

    const div = document.createElement('div')
    const judulBuku = document.createElement('h5');
    const penulisBuku = document.createElement('p');
    const tahunBuku = document.createElement('p');

    const btnRead = document.createElement('button');
    const btnMerah = document.createElement('button');

    div.classList.add("card", "p-3", "mt-2")
    judulBuku.className = 'judul'
    penulisBuku.className = 'penulis'
    tahunBuku.className = 'tahun'
    btnRead.classList.add("btn", "btn-success")
    btnMerah.classList.add("btn", "btn-danger", "mt-1")

    judulBuku.textContent = data.judul
    penulisBuku.innerText = `Penulis: ${data.penulis}`
    tahunBuku.innerText = `Tahun: ${data.tahun}`

    btnRead.innerText = data.isComplete ? 'belum dibaca' : 'sudah dibaca';
    btnMerah.innerText = "Hapus buku"

    div.append(judulBuku, penulisBuku, tahunBuku, btnRead, btnMerah)

    btnMerah.addEventListener('click', () => {
        apusBuku(data.id);
    })
    btnRead.addEventListener('click', () => {
        pindahStatus (data.isComplete?false:true)(data.id)
    })

    return div

     
}


const pindahStatus = (readingStatus) => (id) => {
    const findItem = dataBook.find(item => item.id === id);
    if (findItem != undefined) {
        findItem.isComplete = readingStatus;
    }
    document.dispatchEvent(CUSTOM_EVENT);
    saveToStorage();
}

const apusBuku = (id) => {
    const findData = dataBook.find(item => item.id === id);
    const confirmRemoveData = confirm(`Apakah Anda yakin ingin menghapus buku ${findData.judul}?`);
    if (confirmRemoveData) {
        const index = dataBook.findIndex((item) => item.id === id);
        dataBook.splice(index, 1);
        document.dispatchEvent(CUSTOM_EVENT);
        saveToStorage();
        alert(`Buku ${findData.judul} karya ${findData.penulis} telah dihapus dari rak`);
    }

}

document.addEventListener(EVENT_VAR, () => {
    const unread = document.getElementById('belomDiBaca');
    unread.innerHTML = '';

    const read = document.getElementById('udahDiBaca');
    read.innerHTML = '';

    for (const i of dataBook) {
        const item = buatData(i);
        if (!i.isComplete) {
            unread.append(item);
        } else {
            read.append(item);
        }
    }
})



