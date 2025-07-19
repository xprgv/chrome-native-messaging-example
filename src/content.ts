console.log("Content script loaded");

// Example: Change all paragraphs to red
const paragraphs = document.querySelectorAll("p");
paragraphs.forEach((p) => {
    p.style.color = "red";
});
