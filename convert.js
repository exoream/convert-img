document.getElementById('convertButton').addEventListener('click', convertToPDF);

function convertToPDF() {
    const imageInput = document.getElementById('imageInput');
    const file = imageInput.files[0];
    if (!file) {
        alert('Please select an image file.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageData = event.target.result;
        window.jsPDF = window.jspdf.jsPDF;
        const doc = new jsPDF();
        const image = new Image();

        image.onload = function() {
            doc.addImage(image, "JPEG", 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
            doc.save('converted.pdf');
        };
        image.src = imageData;
    };
    reader.readAsDataURL(file);
}