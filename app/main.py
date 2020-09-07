from flask import Flask
from flask import render_template
from flask import request
from flask import send_from_directory
from PyPDF2 import PdfFileWriter, PdfFileReader
from werkzeug.utils import secure_filename
import os

#######################################

def encryptIt(filename, password):
    file = PdfFileReader(filename)

    if file.isEncrypted:
        return None
    else:
        out = PdfFileWriter()

        for idx in range(file.numPages):
            page = file.getPage(idx)
            out.addPage(page)

        out.encrypt(password)
        newname = str(os.path.splitext(filename)[0]) + "_Encrypted.pdf"

        with open(newname, "wb") as f:
            out.write(f)

        return newname

def decryptIt(filename, password):
    file = PdfFileReader(filename)

    if not file.isEncrypted:
        return None
    else:
        try:
            file.decrypt(password)
            out = PdfFileWriter()

            for idx in range(file.numPages):
                page = file.getPage(idx)
                out.addPage(page)

            newname = str(os.path.splitext(filename)[0]) + "_Decrypted.pdf"

            with open(newname, "wb") as f:
                out.write(f)

            return newname
        except:
            return None

##############################################

app = Flask(__name__)

@app.route('/result/<flag>', methods = ['POST'])
def result(flag):
    password = request.form.get("pass")
    file = request.files['file']
    name = secure_filename(file.filename)
    file.save("app/files/" + name)

    if flag == "encr":
        encname = encryptIt("app/files/" + name, password)

        if encname:
            return render_template('result.html', realname=file.filename, name=encname, flag=0, thePass=password)
        else:
            return render_template('result.html', err="It looks like the file you uploaded is already encrypted. Please go back and upload the correct file.")
    elif flag == "decr":
        decname = decryptIt("app/files/" + name, password)

        if decname:
            return render_template('result.html', realname=file.filename, name=decname, flag=1)
        else:
            return render_template('result.html', err="Decryption failed due to one of the following reasons:  1. File is not encrypted,  2. You have entered wrong password.")
    else:
        return render_template('home.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/home')
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/decrypt')
def decrypt():
    return render_template('decrypt.html')

@app.route('/encrypt')
def encrypt():
    return render_template('encrypt.html')

@app.route('/<path:filename>', methods=['GET'])
def download(filename):
    return send_from_directory(directory=os.getcwd()+"/", filename=filename)

if __name__ == '__main__':
   app.run(debug = True)
