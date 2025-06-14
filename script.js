// Sayfa geçişi fonksiyonu
function sayfaGoster(id) {
  const bolumler = document.querySelectorAll("main section");
  bolumler.forEach(sec => {
    if (sec.id === id) {
      sec.style.display = "block";
    } else {
      sec.style.display = "none";
    }
  });

  // Menü link aktifliği
  document.querySelectorAll("#menu ul li a").forEach(link => {
    link.classList.remove("active");
  });

  const aktifLink = [...document.querySelectorAll("#menu ul li a")].find(link => {
    return link.getAttribute("onclick")?.includes(id);
  });
  if (aktifLink) aktifLink.classList.add("active");
}

// Menü aç/kapa (mobil)
function toggleMenu() {
  const menu = document.getElementById("menu").querySelector("ul");
  menu.classList.toggle("active");
}

// Modal açma ve kapama
function modalAc() {
  document.getElementById("myModal").style.display = "block";
}

function modalKapat() {
  document.getElementById("myModal").style.display = "none";
}

// Slider işlevi
let sliderIndex = 0;
function sliderGoster() {
  const slides = document.querySelectorAll(".slider img.slide");
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === sliderIndex);
  });
  sliderIndex = (sliderIndex + 1) % slides.length;
}

setInterval(sliderGoster, 4000); // 4 saniyede değiştir

// Arama filtresi
document.getElementById("searchInput").addEventListener("input", e => {
  const arama = e.target.value.toLowerCase();
  const kutular = document.querySelectorAll(".content-box");
  kutular.forEach(kutu => {
    const metin = kutu.textContent.toLowerCase();
    if (metin.includes(arama)) {
      kutu.style.display = "block";
    } else {
      kutu.style.display = "none";
    }
  });
});

// İletişim formu gönderme
function iletisimGonder() {
  const form = document.querySelector("#iletisim form");
  const sonuc = document.getElementById("formSonuc");
  sonuc.style.color = "green";
  sonuc.textContent = "Mesajınız başarıyla gönderildi. Teşekkürler!";
  form.reset();
}

// Çiftçi kayıt formu işlemleri
document.getElementById("kayitFormu").addEventListener("submit", e => {
  e.preventDefault();

  const adsoyad = document.getElementById("adsoyad").value.trim();
  const telefon = document.getElementById("telefon").value.trim();
  const il = document.getElementById("il").value.trim();
  const urun = document.getElementById("urun").value;
  const mesaj = document.getElementById("mesaj").value.trim();

  const sonucDiv = document.getElementById("sonuc");

  // Basit telefon numarası kontrolü (10 haneli rakam)
  const telefonDesen = /^[0-9]{10}$/;
  if (!telefonDesen.test(telefon)) {
    sonucDiv.style.color = "red";
    sonucDiv.textContent = "Lütfen geçerli bir 10 haneli telefon numarası girin (ör: 05xxxxxxxxx).";
    return;
  }

  if (!urun) {
    sonucDiv.style.color = "red";
    sonucDiv.textContent = "Lütfen ürün türü seçiniz.";
    return;
  }

  // Başarılı kayıt mesajı
  sonucDiv.style.color = "green";
  sonucDiv.innerHTML = `
    <strong>Kayıt Başarılı!</strong><br />
    Ad Soyad: ${adsoyad}<br />
    Telefon: ${telefon}<br />
    İl: ${il}<br />
    Ürün: ${urun}<br />
    Mesaj: ${mesaj ? mesaj : 'Yok'}
  `;

  // Formu temizle
  e.target.reset();
});

// Sayfa yüklendiğinde ana sayfayı göster
window.onload = () => {
  sayfaGoster("anaSayfa");
  sliderGoster();
  // Tarih gösterimi
  const tarihElem = document.getElementById("tarihGoster");
  if (tarihElem) {
    const bugun = new Date();
    tarihElem.textContent = `Bugünün Tarihi: ${bugun.toLocaleDateString("tr-TR")}`;
  }
};
// Sayı sayaç animasyonu (istatistik bölümü)
document.addEventListener("DOMContentLoaded", () => {
  const sayilar = document.querySelectorAll('.sayi');
  sayilar.forEach(sayi => {
    let hedef = +sayi.dataset.sayi;
    let sayac = 0;
    let artim = hedef / 100;
    let interval = setInterval(() => {
      sayac += artim;
      if (sayac >= hedef) {
        sayac = hedef;
        clearInterval(interval);
      }
      sayi.innerText = Math.floor(sayac);
    }, 30);
  });
});
// Arama inputunu ve içerikleri seç
const searchInput = document.getElementById('searchInput');
const bolumler = document.querySelectorAll('main .bolum, main section'); 

searchInput.addEventListener('input', () => {
  const aranacak = searchInput.value.toLowerCase();

  bolumler.forEach(bolum => {
    const text = bolum.textContent.toLowerCase();

    if(text.includes(aranacak)) {
      bolum.style.display = '';
    } else {
      bolum.style.display = 'none';
    }

    // Eğer arama kutusu boşsa hepsi görünsün
    if(aranacak === '') {
      bolum.style.display = '';
    }
  });
});
document.getElementById('searchInput').addEventListener('input', function() {
  const filter = this.value.toLowerCase();
  const sections = document.querySelectorAll('main .bolum, main section');

  if (!filter) {
    // Arama kutusu boşsa tüm bölümleri göster
    sections.forEach(sec => sec.style.display = '');
  } else {
    // Arama kutusunda metin varsa ilgili bölümleri göster, diğerlerini gizle
    sections.forEach(sec => {
      const text = sec.textContent.toLowerCase();
      if (text.includes(filter)) {
        sec.style.display = '';
      } else {
        sec.style.display = 'none';
      }
    });
  }
});
function sayilariArtir() {
  const sayilar = document.querySelectorAll('.sayi');
  sayilar.forEach(sayiEl => {
    const hedef = +sayiEl.getAttribute('data-sayi');
    let count = 0;
    const artim = 1; // artış miktarını 1 yapıyoruz

    const interval = setInterval(() => {
      count += artim;
      if (count >= hedef) {
        sayiEl.textContent = hedef;
        clearInterval(interval);
      } else {
        sayiEl.textContent = count;
      }
    }, 50); // 50 ms'ye çıkararak yavaşlatıyoruz
  });
}

window.addEventListener('load', sayilariArtir);
function yorumSlider() {
  const yorumlar = document.querySelectorAll('.yorum-slider .yorum');
  let index = 0;

  setInterval(() => {
    yorumlar[index].classList.remove('active');
    index = (index + 1) % yorumlar.length;
    yorumlar[index].classList.add('active');
  }, 4000); // 4 saniyede bir geçiş yapar
}

window.addEventListener('load', yorumSlider);
function sayiAnimasyonu() {
  const sayilar = document.querySelectorAll('.sayi');

  sayilar.forEach(sayi => {
    const hedef = +sayi.getAttribute('data-sayi');
    let sayac = 0;
    const artış = Math.ceil(hedef / 100);
    const interval = setInterval(() => {
      sayac += artış;
      if (sayac >= hedef) {
        sayac = hedef;
        clearInterval(interval);
      }
      sayi.textContent = sayac;
    }, 20);
  });
}

window.addEventListener('load', sayiAnimasyonu);

