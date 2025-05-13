document.addEventListener("DOMContentLoaded", () => {
    const rulesSections = document.querySelectorAll(".rules");

    rulesSections.forEach(section => {
        const paragraph = section.querySelector("p");
        const button = section.querySelector("button");
        const icon = button.querySelector("i");

        // Скрываем параграф при загрузке
        paragraph.style.display = "none";

        button.addEventListener("click", () => {
            if (paragraph.style.display === "none") {
                paragraph.style.display = "block";
                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");
            } else {
                paragraph.style.display = "none";
                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            }
        });
    });
});
