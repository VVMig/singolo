window.onload=()=>{
  scrollToAnchor(); 
  slider();
  blackScreen();
  selectedPortfolioImage();
  shuffleImages();
  modalWindow();
}

const scrollToAnchor = () => {
  const anchors = document.querySelectorAll('.header .menu__link[href*="#"]');
  for (const anchor of anchors) {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      for (const anchor of anchors) {
        anchor.classList.remove('active');
      }
      anchor.classList.toggle('active');
      scrollTo({
        top: document.querySelector(`${anchor.getAttribute('href')}`).getBoundingClientRect().top+pageYOffset-95,
        behavior: "smooth"
      })
    });
    
  }
};

const slider = () => {
  const arrows = document.querySelectorAll(".slider__arrow");
  const slider1 = document.querySelector(".slider__first-slide");
  const slider2 = document.querySelector(".slider__second-slide");
  slider2.style.left = `${-slider2.clientWidth}px`;
  slider1.style.transition = "left 0.3s linear";

  arrows[1].addEventListener("click", () => {
    if (getComputedStyle(slider2).left == "0px") {
      slider1.style.transition = "none";
      slider1.style.left = `${-slider1.clientWidth}px`;
      slider2.style.left = `${slider2.clientWidth}px`;
      slider1.style.transition = "left 0.3s linear";
      slider1.style.left = "0px";
      document.querySelector(".slider").style.borderBottom =
        "6px solid #ea676b";
      document.querySelector(".slider").style.transition =
        "border-bottom 0.3s linear";
    } else if (getComputedStyle(slider1).left == "0px") {
      slider2.style.transition = "none";
      slider2.style.left = `${-slider2.clientWidth}px`;
      slider1.style.left = `${slider1.clientWidth}px`;
      slider2.style.transition = "left 0.3s linear";
      slider2.style.left = "0px";
      document.querySelector(".slider").style.borderBottom =
        "6px solid #648BF0";
      document.querySelector(".slider").style.transition =
        "border-bottom 0.3s linear";
    }
  });
  arrows[0].addEventListener("click", () => {
    if (getComputedStyle(slider2).left == "0px") {
      slider1.style.transition = "none";
      slider1.style.left = `${slider1.clientWidth}px`;
      slider2.style.left = `${-slider2.clientWidth}px`;
      slider1.style.transition = "left 0.3s linear";
      slider1.style.left = "0px";
      document.querySelector(".slider").style.borderBottom =
        "6px solid #ea676b";
      document.querySelector(".slider").style.transition =
        "border-bottom 0.3s linear";
    } else if (getComputedStyle(slider1).left == "0px") {
      slider2.style.transition = "none";
      slider2.style.left = `${slider2.clientWidth}px`;
      slider1.style.left = `${-slider1.clientWidth}px`;
      slider2.style.transition = "left 0.3s linear";
      slider2.style.left = "0px";
      document.querySelector(".slider").style.borderBottom =
        "6px solid #648BF0";
      document.querySelector(".slider").style.transition =
        "border-bottom 0.3s linear";
    }
  });
}

const blackScreen=()=>{
  let iphones=document.querySelectorAll('.iphone');
  document.querySelector('.slider__first-slide').addEventListener('click',(e)=>{
    iphones[parseFloat(e.target.getAttribute('data-orientation'))].childNodes[1].classList.toggle('iphone-disactive');
    iphones[parseFloat(e.target.getAttribute('data-orientation'))].childNodes[3].classList.toggle('iphone-disactive');
  })
}

const selectedPortfolioImage=()=>{
  let images=document.querySelectorAll('.portfolio__image img');
  for (const image of images) {
    image.classList.add('portfolio__image-noborder');
  }
  for (let image=0;image< images.length;image++) {
    images[image].addEventListener('click',()=>{
      images[image].classList.toggle('portfolio__image-noborder');
      images[image].classList.toggle('portfolio__image-border');
      for (let i = 0; i < images.length; i++) {
        if(i==image) continue;
        images[i].classList.remove('portfolio__image-border');
        images[i].classList.add('portfolio__image-noborder');
      }
    })
  }
}

const shuffleImages=()=>{
  let category=document.querySelectorAll('.portfolio__item');
  let lastItem=-1;

  for (const item of category) {
    item.childNodes[1].addEventListener('click',(e)=>{
      e.preventDefault();
    })
  }

  for(let i=0;i<category.length;i++) {
    category[i].addEventListener('click',()=>{
      for (const item of category) {
        item.classList.remove('portfolio-active');
        item.childNodes[1].classList.remove('portfolio-active');
      }
      category[i].classList.toggle('portfolio-active');
      category[i].childNodes[1].classList.toggle('portfolio-active');

      if(i==lastItem) return;
      lastItem=i;

      let images=document.querySelectorAll('.portfolio__image');
      let unique=[];
      let newNodes=[];

      for (let i = 0; i < 6; i++) {
        let rand=Math.ceil(Math.random() * (images.length-1-6))+5;
        while(unique.includes(rand)){
          rand=Math.ceil(Math.random() * (images.length-1-5))+5;
        }
        unique.push(rand);
      }

      for (let i = 0; i < 6; i++) {
        newNodes[i]=images[unique[i]];
        newNodes[unique[i]]=images[i];
        images[i].remove();
        images[unique[i]].remove();
      }
      
      newNodes.forEach(el=>{
        document.querySelector('.portfolio__examples').append(el);
      })

      let y=-1;
      images.forEach(e=>{
        e.style.transform=`scale(0)`;
      })
      const animateImages=()=>{
        y+=0.2;
        images.forEach(e=>{
          e.style.transform=`scale(${y})`;
        })
        if(y==1) clearInterval(interval);
      }
      let interval=setInterval(animateImages,20);
      
    })
  }
}

const modalWindow=()=>{
  let submit=document.querySelectorAll('.form input')[3];;
  let data={};

  submit.addEventListener('click',(e)=> {
    data=getInputsInfo(e);
    if(data["theme"]=='') data["theme"]="Without subject";
    if(data["discribe"]=='') data["discribe"]="Without description";
    generateModal(data);
  });
}

const generateModal=(data)=>{

  let overlay=document.createElement('div');
  let window=document.createElement('div');
  let title=document.createElement('div');
  let theme=document.createElement('div');
  let discribe=document.createElement('div');
  let btn=document.createElement('button');

  overlay.classList.add('modal-window__overlay');
  window.classList.add('modal-window');
  title.classList.add('modal-title');
  theme.classList.add('modal-theme');  
  discribe.classList.add('modal-discribe');

  title.innerHTML="<h4>The letter was sent</h4>";
  theme.innerHTML=`<p>Subject: ${data["theme"]}</p>`;
  discribe.innerHTML=`<p>Description: ${data["discribe"]}</p>`;
  btn.innerText='Ok';

  window.append(title,theme,discribe,btn);
  overlay.append(window);
  document.body.style.overflow="hidden";

  document.body.append(overlay);
  btn.addEventListener('click',()=>{
    overlay.remove()
    document.body.style.overflow="visible";
  });
}

const getInputsInfo=(e)=> {
  let input=document.querySelectorAll('.form input');
  let discribe=document.querySelector('.form textarea');
  let reset=true;

  input.forEach(inp=>{
    if(!inp.checkValidity()){
      reset=false;
    }
  })
  if(reset){
    e.preventDefault();
    input=document.querySelectorAll('.form input')[2];
    return {
      "theme": input.value,
      "discribe": discribe.value 
    }
  } 
}

