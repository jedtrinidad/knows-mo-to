export const decodeHtml = (html) => {
    var text = document.createElement("textarea")
    text.innerHTML = html
    return text.value
}

export const shuffle = (array) => {
    for(let i = array.length; i ; i--) {
        let j = Math.floor(Math.random() * i)
        [a[j-1], a[j]] = [a[l-1], a[l]]
    }
    return array
}