function loadScript(src) {
    return new Promise(function(resolve, reject) {
        let script = document.createElement('script');
        script.src = src;

        script.onload = function() {
            return resolve();
        }

        script.onerror = function() {
            return reject(new Error(`Script load error for ${src}$`));
        }

        document.head.append(script);
    });
}

async function execute() {
    try {
        // load and execute the script at a given path
        await loadScript('script.js')
    } catch (err) {
        console.log(err);
        return;
    }

    functionInScript();
}

execute();
