import os
from flask import Flask, render_template, request, flash, url_for, redirect
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
    
@app.route('/info')
def info():
    return 'Info'

@app.route('/register', methods=['POST', 'GET'])
def register():
	if request.method == 'POST':
		try:
			name = request.form['name']
			images = request.files.getlist('images')
			path, resNum = folderCheck(name)

			for image in images:
				imgType = image.filename.split('.')[1]
				imgName = 'image' + str(resNum) + '.' + imgType
				resNum += 1
				image.save(path+imgName)

			flash('success')
		except:
			flash('failed')
	return redirect(url_for('index'))


def folderCheck(name):
	if os.path.isdir('/family/'+ name) == False:
		os.makedirs('/family/'+ name)
	dirList = os.listdir('/family/' + name)
	numbers = []
	for dl in dirList:
		tmp = dl.split('.')[0]
		tmp = tmp.replace('image','')
		numbers.append(int(tmp))
	numbers.sort()
	if len(numbers) > 0:
		last = numbers[-1]
	else:
		last = 0
	resNum = last + 1
	return '/family/' + name + '/', resNum

if __name__ == "__main__":
	app.secret_key = 'super secret key'
	app.config['SESSION_TYPE'] = 'filesystem'
	app.run(host='0.0.0.0', debug=True)
	#app.run(host='0.0.0.0')
