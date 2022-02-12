// convert a blob url (blob:...) to actual file
const saveBlob = function (url, fileName) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
};

const sleep = function (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const simulateClick = function (elem) {
	var evt = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
		view: window
	});
	var canceled = !elem.dispatchEvent(evt);
};

const scrollToBottom = function () {
    const scrollDownButton = document.getElementsByClassName('ScrollDownButton')[0];
    if (scrollDownButton.classList.contains('revealed')) {
        simulateClick(scrollDownButton.getElementsByTagName('button')[0]);
    }
}

const callbackNewMessage = function(mutationsList, observer){
    for(const mutation of mutationsList) {
        addedMessages = mutation.addedNodes;
        for (const msg of addedMessages) {
            
            sleep(2000).then(() => {
                const isSticker = msg.getElementsByClassName('Sticker')[0] != null;
                const imgSrc = msg.getElementsByClassName('full-media')[0].src;
                if (!isSticker && imgSrc != null){
                    var d = new Date()
                    var datestring = (d.getFullYear() + "_" + ("0"+(d.getMonth()+1)).slice(-2) + "_" + ("0" + d.getDate()).slice(-2) + " " +
     ("0" + d.getHours()).slice(-2) + "_" + ("0" + d.getMinutes()).slice(-2) + "_" + ("0" + d.getSeconds()).slice(-2));
                    var filename = "BOTLOG "
                            .concat(datestring.toString())
                            .concat(".jpg")
                    
                    saveBlob(imgSrc, filename);
                    console.log(imgSrc);
                }
            
            });
        }
    }
}

const addContainerObserver = function () {
    const config = {childList: true};
    const observer = new MutationObserver(callbackNewMessage);
    
    const containers = document.getElementsByClassName('message-date-group');
    
    for(const container of containers) {
        observer.observe(container, config);
    }
}

const main = function () {
    addContainerObserver();
    setInterval(scrollToBottom, 1000);
}

main();
