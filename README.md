# 🚀 Control de Estanque - Guía de Instalación y Ejecución

## 📁 Estructura del Proyecto

```
proyecto-final/
│
├── backend/ → API Flask (nivel de agua, bomba, login)
├── frontend/ → React App
└── package.json → corre ambos servicios juntos
```

---

## ✅ Pasos básicos para ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd proyecto-final
```

### 1.1. Habilitar puertos públicos en GitHub Codespaces

Si usas Codespaces:

```bash
gp ports visibility 3000:public 5000:public
```

Esto asegura que los puertos estén siempre visibles sin necesidad de configurarlos manualmente.

```bash
git clone <url-del-repositorio>
cd proyecto-final
```

### 2. Instalar dependencias

#### Backend:

```bash
cd backend
pip install flask flask-cors flask-bcrypt flask-sqlalchemy
```

(Opcional si tienes `requirements.txt`):

```bash
pip install -r requirements.txt
cd ..
```

#### Frontend:

```bash
cd frontend
npm install
cd ..
```

#### Dependencias generales (root):

```bash
npm install
```

---

### 3. Iniciar la aplicación completa (Backend + Frontend)

```bash
npm start
```

Esto ejecutará:

* 🟢 Frontend React: [http://localhost:3000](http://localhost:3000)
* 🟢 Backend Flask API: [http://localhost:5000](http://localhost:5000)

---

## 📌 Recomendaciones para GitHub Codespaces

Si utilizas Codespaces:

* Ve a **Ports** (barra inferior) → **Add Port** → agrega **3000** y **5000**.
* Click derecho en cada puerto → **Make Public**.

Si tienes `.devcontainer/devcontainer.json`, los puertos se abrirán automáticamente.

---

## 📝 Comandos útiles

| Comando                    | ¿Qué hace?                       |
| -------------------------- | -------------------------------- |
| `npm start`                | Inicia backend y frontend juntos |
| `cd backend && flask run`  | Solo backend                     |
| `cd frontend && npm start` | Solo frontend                    |

---

¡Listo! 🚀 Tu aplicación debería estar corriendo correctamente.

