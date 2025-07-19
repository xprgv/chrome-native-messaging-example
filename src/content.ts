console.log("Content script loaded");

const paragraphs = document.querySelectorAll("p");
paragraphs.forEach((p) => {
    p.style.color = "red";
});
