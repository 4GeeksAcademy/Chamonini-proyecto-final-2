from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Simulador de nivel (en metros)
nivel_actual = 4.5
motobomba_encendida = False

@app.route('/level', methods=['GET'])
def get_level():
    global nivel_actual
    # Simulación: nivel baja si la motobomba está apagada
    nivel_actual += random.uniform(-0.1, 0.1)
    nivel_actual = max(0, round(nivel_actual, 2))
    return jsonify({
        "nivel_metros": nivel_actual
    })

@app.route('/pump/on', methods=['POST'])
def pump_on():
    global motobomba_encendida
    motobomba_encendida = True
    return jsonify({"motobomba": "encendida"})

@app.route('/pump/off', methods=['POST'])
def pump_off():
    global motobomba_encendida
    motobomba_encendida = False
    return jsonify({"motobomba": "apagada"})

@app.route('/pump/status', methods=['GET'])
def pump_status():
    estado = "encendida" if motobomba_encendida else "apagada"
    return jsonify({"motobomba": estado})

if __name__ == '__main__':
    app.run(debug=True, port=5000)