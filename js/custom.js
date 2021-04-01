function ajaxJSON (data = {}, url = '',callback = null, errorCallback = null, method = 'POST') {
    fetch(url,
        {
            method: method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
        })
        .then(response => {
            if (response.status == 404 || response.status == 500) {
                if (errorCallback !== null && errorCallback != '') {
                    window[errorCallback]();
                    return;
                }
            }

            if (response.status !== 200) {
                return Promise.reject();
            }

            return response.json();
        })
        .then(function (data) {
            if (callback !== null && callback != '') {
                console.log('fetch ok');
                window[callback](data);
            }
        })
        .catch((e) => {
            console.log(e);
        });
}

function ajaxXHR (data = {}, url = '',callback = null, errorCallback = null, method = 'POST') {
    xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.callback = callback;
    xmlhttp.onload = callback;
    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(data));

    console.log(xmlhttp.response);
}

function publicateSandbox (sandbox) {
    ajaxJSON({link:sandbox}, '/ajax/publicate', 'publicateSandboxSuccess', 'publicateSandboxError')
}
function publicateSandboxSuccess (data) {
    let button = document.querySelector('.publicate-button');

    if (data.data == 0) {
        button.innerHTML = 'Опубликовать';
    } else {
        button.innerHTML = 'Скрыть';
    }
    console.log(data);
}
function publicateSandboxError () {

}

function saveSandbox () {
    let sandboxLink = 'GAsI9';
    ajaxJSON({link:sandboxLink, code:editor.getValue()}, '/ajax/saveSandbox', 'saveSandboxSuccess');
}
function saveSandboxSuccess (data) {
    console.log(data);
}

function startSandboxSuccess (data) {
    console.log(data);
    document.querySelector('#result').innerHTML = this.responseText;
}
function startSandbox () {
    let sandboxLink = 'GAsI9';

    ajaxXHR({sandbox:sandboxLink, code:editor.getValue(), version:document.querySelector('#php-version').value}, '/ajax/start', startSandboxSuccess);
}
