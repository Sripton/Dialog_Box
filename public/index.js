const tabcontent = document.querySelectorAll(".tabcontent");
const tabheader__item = document.querySelectorAll(".tabheader__item");
const tabheader = document.querySelector(".tabheader");
const hideFunction = () => {
  tabcontent.forEach((element) => {
    element.style.display = "none";
  });
  tabheader__item.forEach((element) => {
    element.classList.remove("tabheader__item_active");
  });
};

const showFunction = (index) => {
  tabcontent[index].style.display = "block";
  tabheader__item[index].classList.add("tabheader__item_active");
};
tabheader.addEventListener("click", (event) => {
  const { target } = event;
  if (target && target.classList.contains("tabheader__item")) {
    tabheader__item.forEach((elem, index) => {
      if (target === elem) {
        hideFunction();
        showFunction(index);
      }
    });
  }
});
