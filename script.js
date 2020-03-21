window.onload=()=>{
  burgerToggle();
  scrollToAnchor(); 
  slider();
  blackScreen();
  selectedPortfolioImage();
  shuffleImages();
  modalWindow();
}

const burgerToggle=()=> {
  const burger=document.querySelector('.burger__menu');
  const burgerMenu=document.querySelector('.menu__list');
  burger.addEventListener('click', ()=>{
    burger.classList.toggle('burger__active');
    
    if(burgerMenu.getAttribute('class')=='menu__list menu__list-disactive') {
      openMenu(burgerMenu);
    }
    else if(burgerMenu.getAttribute('class')=='menu__list menu__list-active') {
      closeMenu(burgerMenu);
    }
  });
}

const openMenu=(menu)=>{
  menu.classList.remove('menu__list-disactive');
  menu.classList.add('menu__list-active');
}

const closeMenu=(menu)=>{
  menu.classList.remove('menu__list-active');
  menu.addEventListener('animationend',()=>{
    if(menu.getAttribute('class')=='menu__list') {
      menu.classList.add('menu__list-disactive');
    }
  })
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
        top: document.querySelector(`${anchor.getAttribute('href')}`).getBoundingClientRect().top+pageYOffset-document.querySelector('header').clientHeight,
        behavior: "smooth"
      })
    });
  }

  window.addEventListener('scroll',()=>{
    
  })
};

const slider = () => {
  const arrows = document.querySelectorAll(".slider__arrow");
  const slider1 = document.querySelector(".slider__first-slide");
  const slider2 = document.querySelector(".slider__second-slide");
  let slider=[slider1,slider2];
  let current=0;

  arrows[1].addEventListener("click", () => {
    slider[current+1==2?0:1].style.animation='appear-left 0.4s ease-in-out';
    slider[current].style.animation='disappear-right 0.4s ease-in-out';
    slider[current].style.transform='translateX(100%)';
    slider[current+1==2?0:1].style.transform='translateX(0)';
    current++;
    if(current==2) current=0;
  });
  arrows[0].addEventListener("click", () => {
    slider[current+1==2?0:1].style.animation='appear-right 0.4s ease-in-out';
    slider[current].style.animation='disappear-left 0.4s ease-in-out';
    slider[current].style.transform='translateX(-100%)';
    slider[current+1==2?0:1].style.transform='translateX(0)';
    current++;
    if(current==2) current=0;
  });
}

const blackScreen=()=>{
  let iphones=document.querySelectorAll('.iphone');
  for (const iphone of iphones) {
    iphone.addEventListener('click', (e)=>{
      e.target.parentElement.childNodes[3].classList.toggle('iphone-disactive');
      e.target.parentElement.childNodes[1].classList.toggle('iphone-disactive');


    })
  }
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
    overlay.remove();
    resetInputs();
    document.body.style.overflow="visible";
  });
}

const resetInputs=()=>{
  let input=document.querySelectorAll('.form input');
  let discribe=document.querySelector('.form textarea');

  input.forEach(e=>{
    e.value='';
  })
  discribe.value='';
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

