const scrollToAnchor=(()=>{
  const anchors=document.querySelectorAll('.header .menu__link[href*="#"]');
  for (const anchor of anchors) {
    anchor.addEventListener('click',(e)=>{
      e.preventDefault();
      document.querySelector(`${anchor.getAttribute("href")}`)
      .scrollIntoView({
        behavior: "smooth"
      })
    })
  }
})();

