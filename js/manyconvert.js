document.getElementById('convertButton').addEventListener('click', convertToPDF);

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function convertToPDF() {
    const images = document.querySelectorAll('#imageContainer img');
    if (images.length === 0) {
        alert('Please upload at least one image.');
        return;
    }

    window.jsPDF = window.jspdf.jsPDF;
    const doc = new jsPDF();
    let yOffset = 0;

    images.forEach((image, index) => {
        const imgWidth = doc.internal.pageSize.getWidth();
        const imgHeight = doc.internal.pageSize.getHeight();

        if (index !== 0) {
            doc.addPage();
            yOffset = 0;
        }

        doc.addImage(image, "JPEG", 0, yOffset, imgWidth, imgHeight);
        yOffset += imgHeight;
    });

    const randomString = generateRandomString(5);
    const fileName = `converted_${randomString}.pdf`;
    doc.save(fileName);

    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '';
    const imageInput = document.getElementById('imageInput');
    imageInput.value = '';
}

function loadImg(event) {
    const files = event.target.files;
    if (!files || files.length === 0) {
        alert('Please select at least one image file.');
        return;
    }
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) {
            alert('Please upload image files only.');
            continue;
        }
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageData = event.target.result;
            displayImage(imageData);
        };
        reader.readAsDataURL(file);
    }
}

function displayImage(imageData) {
    const imageContainer = document.getElementById('imageContainer');
    const img = document.createElement('img');
    img.src = imageData;
    imageContainer.appendChild(img);
}

