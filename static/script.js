function downloadSite() {
    let url = document.getElementById("url").value;
    let statusElement = document.getElementById("status");

    if (!url.trim()) {
        statusElement.innerHTML = "⚠️ Please enter a valid URL!";
        statusElement.style.color = "yellow";
        return;
    }

    statusElement.innerHTML = "⏳ Downloading...";
    statusElement.style.color = "white";

    fetch('/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `url=${encodeURIComponent(url)}`
    })
    .then(response => {
        if (response.ok) return response.blob();
        return response.json().then(err => { throw new Error(err.error); });
    })
    .then(blob => {
        let a = document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = "website.zip";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        statusElement.innerHTML = "✅ Download complete!";
        statusElement.style.color = "lime";
    })
    .catch(error => {
        statusElement.innerHTML = `❌ Error: ${error.message}`;
        statusElement.style.color = "red";
    });
}

