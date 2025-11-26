from flask import Flask, render_template

# Cria uma instância da aplicação Flask
app = Flask(__name__)

# Define uma rota (o endereço que o usuário irá acessar)
# Neste caso, a raiz da aplicação ("/")
@app.route('/')
def home():
    # Usa a função render_template para buscar e renderizar
    # o arquivo 'index.html' que está na pasta 'templates'
    return render_template ('pagina3.html')

@app.route('/pagina2.html')
def pagina2_page():
    return render_template("/pagina2.html")

@app.route('/index.html')
def pagina3_page():
    return render_template("/index.html")

@app.route('/pagina3.html')
def pagina4_page():
    return render_template("/pagina3.html")

# Bloco para rodar a aplicação
if __name__ == '__main__':
    # Roda a aplicação no modo debug, o que ajuda no desenvolvimento
    app.run(debug=True)