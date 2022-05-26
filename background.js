function bionicRead() {
    function convert(item, len) {
        return item.split(' ').map(i => {
            let first = i.slice(0, len)
            let last = i.slice(len,)
            return `${first}<strong>${last}</strong>`
        }).join(' ')
    }

    const tags = ['p', 'span'];
    const parser = new DOMParser();

    tags.forEach((tag) => {
        for (let e of document.getElementsByTagName(tag)) {
            let element = parser.parseFromString(e.innerHTML, 'text/html')
            let nodes = [...element.body.childNodes]
            let converted = nodes.map(node => {
                if (node.nodeType === 3) {
                    return convert(node.nodeValue, 3)
                }
                return node.innerHTML
            })
            e.innerHTML = converted.join(' ')
        }
    })
}

chrome.action.onClicked.addListener((tab) => {
    if (!tab.url.includes("chrome://")) {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: bionicRead
        });
    }
});
