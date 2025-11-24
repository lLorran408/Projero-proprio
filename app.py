from flask import Flask, render_template

app = Flask(__name__)

app = Flask(__name__)

@app.route('/')
def hello_world():
    return '<h1></h1>'

@app.route('/index')
def index():
    return 'Index Page'

@app.route('/login')
def login():

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run(debug=True)
