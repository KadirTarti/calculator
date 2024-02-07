//* ======================================================
//*                     IOS CALCULATOR
//* ======================================================


const numberButtons = document.querySelectorAll('.num');  // tüm numaraları çağırdık
const operationButtons = document.querySelectorAll('.operator'); // tüm operatörleri çağırdık
const equalButton = document.querySelector('.equal'); // eşittir işaretini çağırdık
const previousDisplay = document.querySelector('.previous-display');   // üst ekran
const currentDisplay = document.querySelector('.current-display');    // alt ekran


//?operator değişkenleri
let ustEkranText = '';
let altEkranText = '';
let islem = '';

// eşittir yada percent e basıldıktan sonra yeni işleme yeni sayılar girmek için, tıklandı tıklanmadı boolean değişkeni hazırladık, eşittir (ve de percent) butonunda bu true yani tıklandı olacak
let equalAndPercentPressed = false


//?*********** herhangi bir number a basılınca
numberButtons.forEach((number)=>{
  number.onclick=()=>{
    ekranaHazirlik(number.textContent);

    updateEkran();  
  };
});




//!EKRANA HAZIRLIK
const ekranaHazirlik = (num) =>{
   
     //kullanıcı 0 girerse, sonrasında 0 ve . dışında bir sayı girerse, ekranda sadece girilen yeni sayı (0 iptal olsun) gözüksün
  if(altEkranText === '0' && num!=='0' && num!=='.'){
    altEkranText = num;
    return; //!  ->    bu döngüden çık... bu işini globaldeki değişkeni değiştirerek bitir ama bişey döndürme, daha önceki 0'ı da yok say
  };

 // kullanıcı herhangi bir yerde . girmişken, tekrar nokta girmeye kalkarsa giremesin
    if (num =='.' && altEkranText.includes('.')) return;

 // kullanıcı 10 haneden sonra girmesin
    if (altEkranText.length > 9) return;


 // kullanıcı ilk başta 0 girer ardından tekrar 0 girerse, girilmesin, tek 0 döndürsün
    if(altEkranText == '0' &&  num =='0') return;

 // eşittir yada percent a basıldıktan sonra girilen number tek başına ekranda görünsün,çünkü yeni işlem başlıyor(ekranda 72 yazan işlem sonucu varken 5 e basınca 725 olmasın, sadece 5 olsun)

    if (equalAndPercentPressed == true) {

      equalAndPercentPressed = false;

      altEkranText = num;
      return;   // bu döngüden çık bu işini globaldeki değişkeni değiştirerek bitirdi ama bişey döndürmeyecek, daha önceki 0 ı da yok sayacak
  
 };


 //?bütün şartları başarı ile geçtiyse basılan numaraları arka arkaya ekle
  altEkranText += num;
};




//!BURADA YAPILANLARI EKRANA BASTIRMA
const updateEkran = () => {
  
  currentDisplay.textContent = altEkranText;
 


  //?işlem girilince
  if (islem) {
    previousDisplay.textContent = ustEkranText + islem // üstEkran'da alt ekrandaki sayı ve işlem görünsün 
  } else {
    previousDisplay.textContent='' //aksi halde hiçbir şey olmasın
  }
};


//?**************HERHANGİ BİR İŞLEME TIKLANDIĞINDA

operationButtons.forEach((op) =>{
  op.onclick=()=>{

    //?currentDisplay boşken, hiçbir şekilde sayı girişi yapılmamışsa, operatöre basılmasın. boş return yapmaya çalıştığınız işlemi yaptırmaz.
    //? return fonksiyon içerisinde her yerde kullanılabilir. Kod return satırına eriştiğinde fonksiyon durur ve değer fonksiyonun çağırıldığı yere geri gönderilir. Bir fonksiyon içerisinde birden fazla return fonksiyonu da olabilir. return değer döndürmek zorunda değildir. boş return den sonra else if veya else yerine if tercih etmeliyiz
    if(altEkranText==='') return

    //* eşittire basılmadan arka arkaya işleme basılırsa (alt ve üst ekran doluyken işleme basılmaya devam edilirse)
    if (altEkranText && ustEkranText) hesapla();

    islem=op.textContent;

    ustEkranText=altEkranText;
    altEkranText='';

    updateEkran();
  };
});

//?**************eşittir butonuna tıklandığında
equalButton.onclick=()=>{
 // eşittire basılınca istenen 4 işlem için fonksiyon ->
  hesapla();

  // üstteki yapılan işlem sonucu ekrana yansıtan fonksiyon ->
  updateEkran();

  equalAndPercentPressed = true
};



//! HESAPLA FONKSİYONU
const hesapla = () =>{
  switch (islem) {
    case '+':
      sonuc = +ustEkranText + Number(altEkranText)
      break;
    case '-':
      sonuc = +ustEkranText - altEkranText
      break;
    case 'x':
      sonuc = +ustEkranText * altEkranText
      break;
    case '÷':
      sonuc = +ustEkranText / altEkranText
      break;
    default:
      break;
  }
  altEkranText = sonuc;
  ustEkranText='';
  islem='';
};



//?AC butonuna basıldığında
document.querySelector(".ac").onclick=()=>{
  islem=""
  altEkranText=""
  ustEkranText=""
  
  updateEkran()
  
  }


//? PM butonuna basıldığında
document.querySelector('.pm').onclick=()=>{
  if(!altEkranText) return

  altEkranText = altEkranText*-1
  updateEkran()
}


//? percent butonuna basıldığında

document.querySelector('.percent').onclick =()=>{

  altEkranText = altEkranText/100
  updateEkran()

  altEkranText=''
  
  //equalAndPercentPressed = true
  // veya  altEkranText = '' 
  
}

