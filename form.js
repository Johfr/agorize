const form = document.querySelector('.search-form')
const output = document.querySelector('.output')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const p = document.createElement('p')
    p.innerHTML = resultMessage
    output.appendChild(p)
})
