function decodeBarcode() {
    const fileInput = document.getElementById("barcodeImage");
    const file = fileInput.files[0];
    if (!file) {
        alert("يرجى رفع صورة الباركود أولاً.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

            if (qrCode) {
                document.getElementById("output").textContent = "الرقم السري للواي فاي: " + qrCode.data;
            } else {
                document.getElementById("output").textContent = "لم يتم العثور على باركود صالح.";
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}
