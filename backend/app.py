from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuración base de datos SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///nivel_estanque.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modelo
class LevelRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nivel = db.Column(db.Float, nullable=False)
    fecha_hora = db.Column(db.DateTime, default=datetime.utcnow)

with app.app_context():
    db.create_all()

# Estado actual
nivel_actual = 4.5
motobomba_encendida = False

@app.route('/level', methods=['GET'])
def get_level():
    return jsonify({"nivel_metros": round(nivel_actual, 2)})

@app.route('/history', methods=['GET'])
def get_history():
    registros = LevelRecord.query.order_by(LevelRecord.fecha_hora.desc()).limit(50).all()
    historial = [
        {"nivel": r.nivel, "fecha_hora": r.fecha_hora.strftime("%Y-%m-%d %H:%M:%S")}
        for r in registros
    ]
    return jsonify(historial)

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

@app.route('/simulate', methods=['POST'])
def simulate():
    global nivel_actual, motobomba_encendida

    if motobomba_encendida:
        nivel_actual = min(5, round(nivel_actual + 0.2, 2))
    else:
        nivel_actual = max(0, round(nivel_actual - 0.1, 2))

    porcentaje = (nivel_actual / 5) * 100

    # Encender bomba si llega a 25%
    if porcentaje <= 25 and not motobomba_encendida:
        motobomba_encendida = True

    # Apagar bomba si llega a 100%
    if porcentaje >= 100 and motobomba_encendida:
        motobomba_encendida = False

    registro = LevelRecord(nivel=nivel_actual)
    db.session.add(registro)
    db.session.commit()

    return jsonify({
        "nivel_metros": nivel_actual,
        "porcentaje": round(porcentaje, 2),
        "bomba": "encendida" if motobomba_encendida else "apagada"
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
