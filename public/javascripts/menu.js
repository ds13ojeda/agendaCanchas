const menu = document.querySelector(".menu")
const days = document.querySelector('.days')
const reset = document.querySelector('#reset')

menu.addEventListener('click', function() {
    days.classList.toggle('hide')
})