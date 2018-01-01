declare const chrome;

export class LocalStream {

    static send(msg){
        return new Promise((resolve:any, reject:any) => {
            chrome.runtime.sendMessage(msg, (response) => resolve(response))});
    }

    static watch(callback:any) {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if(sender.id !== chrome.runtime.id) return;
                callback(request, sendResponse);
                return true;
            }
        );
    }
}

export default LocalStream;