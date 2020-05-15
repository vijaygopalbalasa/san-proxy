chrome.storage.sync.get(["apiurl"], function(result) {

    console.log("Value currently is " + result.apiurl);
    console.log("Activated the Proxy Server:", result.apiurl);

    if (result.apiurl === undefined || result.apiurl === "") {
        if (document.getElementById("status") != null) {
            document.getElementById("status").innerHTML = "<b>🔴 Disabled</b>";
        }
        return {
            mode: "direct"
        }
    }
    var config = {
        mode: "fixed_servers",
        rules: {
            proxyForHttps: {
                scheme: "socks5",
                host: result.apiurl.split(":")[0],
                port: parseInt(result.apiurl.split(":")[1])
            },
            bypassList: ["sanweb.info"]
        }
    };
    if (result.apiurl === undefined || result.apiurl.split(":")[1] === undefined) {
        console.log("Proxy Server not Activated");
        if (document.getElementById("status") != null) {
            document.getElementById("status").innerHTML = "<b>🔴 Disabled</b>";
        }
    } else {
        console.log("Proxy Server Activated with IP \t" + result.apiurl);
        if (document.getElementById("status") != null) {
            document.getElementById("status").innerHTML = "<b>☑ Active</b>";
        }
        chrome.proxy.settings.set({
                value: config,
                scope: "regular"
            },
            function() {});
    }
});

async function fetchip() {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch("https://api.ipify.org/?format=json");
        var data = await response.json();
        console.log(data.ip);
        if (document.getElementById("iptest") != null) {
            document.getElementById("iptest").innerHTML = data.ip;
        }
    } catch (exception) {
        console.log("Failed to retrieve your IP informations");
        if (document.getElementById("iptest") != null) {
            document.getElementById("iptest").innerHTML = "<b>Invalid Proxy</b>";
        }
    }
}
fetchip();