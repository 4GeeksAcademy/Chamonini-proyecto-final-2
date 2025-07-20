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

---

### 2. Instalar dependencias necesarias

#### Backend:

```bash
cd backend
pip install -r requirements.txt
cd ..
```

#### Frontend:

```bash
cd frontend
npm install
cd ..
```

#### Dependencias generales (raíz del proyecto):

```bash
npm install
```

---

### 3. Iniciar la aplicación completa (Backend + Frontend juntos)

```bash
npm start
```

Esto ejecutará:

* 🟢 Frontend React: [http://localhost:3000](http://localhost:3000)
* 🟢 Backend Flask API: [http://localhost:5000](http://localhost:5000)

---

## 📌 Solución a errores comunes (Codespaces)

### Si frontend muestra error `Cannot find module './async-modules/AsyncModuleHelpers'` o similar:

```bash
cd frontend
rm -rf node_modules package-lock.json
cd ..
rm -rf node_modules package-lock.json
npm install
cd frontend
npm install
cd ..
npm start
```

---

## 📝 Comandos útiles

| Comando                    | ¿Qué hace?                       |
| -------------------------- | -------------------------------- |
| `npm start`                | Inicia backend y frontend juntos |
| `cd backend && flask run`  | Inicia solo backend              |
| `cd frontend && npm start` | Inicia solo frontend             |

---

¡Listo! 🚀 Tu aplicación debería estar corriendo correctamente.

