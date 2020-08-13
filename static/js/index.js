var fileTag = document.getElementById('fileTag');
var imageField = document.getElementById('image-field');
var info = document.getElementById('info');
var hidden = document.getElementById('hidden');
var submitbtn = document.getElementById('submitbtn');
var nameField = document.getElementById('nameField');


fileTag.addEventListener("input", function() {
	readMultiFiles(this.files);
});

nameField.addEventListener("change", function() {
    checkForm();
});

function readMultiFiles(files) {
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
			hidden.value += content + ';end;';
			checkForm();
			img.addEventListener('dblclick', function(e) {
				var list = hidden.value.split(';end;');
				list.pop();
				var idx = Array.prototype.indexOf.call(imageField.children, img);
				if (idx > -1) { list.splice(idx, 1); }
				hidden.value = '';
				for (var i=0; i<list.length; i++) { 
					hidden.value += list[i] + ';end;';
				}
				imageField.removeChild(img);
				checkForm();
			});
		};
	}
}

function checkForm() {
	var imglen = imageField.childNodes.length;
	if (imglen <= 0) {
		info.style.visibility = 'hidden';
	} else if (imglen > 0) {
		info.style.visibility = 'visible';
	}
	if (nameField.value == '' || imglen <= 0 ) {
		submitbtn.disabled = true;
	} else {
		submitbtn.disabled = false;
	}
}
