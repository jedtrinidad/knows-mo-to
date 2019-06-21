export const decodeHtml = (html) => {
    var text = document.createElement("textarea")
    text.innerHTML = html
    return text.value
}
export const shuffle = (array) => {
    let ctr = array.length, temp, index

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr)
        ctr --
        temp = array[ctr]
        array[ctr] = array[index]
        array[index] = temp
    }
    return array
}