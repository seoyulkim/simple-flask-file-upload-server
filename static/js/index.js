var fileTag = document.getElementById('fileTag');
var imageField = document.getElementById('image-field');
var submitbtn = document.getElementById('submitbtn');
var nameField = document.getElementById('nameField');


fileTag.addEventListener("input", function() {
	readMultiFiles(this.files);
});

nameField.addEventListener("change", function() {
    checkForm();
});

function readMultiFiles(files) {
	while (imageField.hasChildNodes()) {
    	imageField.removeChild(imageField.firstChild);
    }
	for (file of files) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.fileName = file.name;
		reader.onload = (event) => {
			const fileName = event.target.fileName;
			const content = event.currentTarget.result;
			var img = document.createElement('img');
            img.setAttribute('class', 'image');
            img.setAttribute('src', content);
			imageField.appendChild(img);
			checkForm();
		};
	}
}

function checkForm() {
	var imglen = imageField.childNodes.length;
	if (nameField.value == '' || imglen <= 0 ) {
		submitbtn.disabled = true;
	} else {
		submitbtn.disabled = false;
	}
}
