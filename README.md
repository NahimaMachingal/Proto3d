## Next.js 3D Model Viewer

This is a **Next.js** project bootstrapped with `create-next-app`. It provides a **3D model viewer** using **Three.js** and interacts with both **FastAPI** and **Next.js API routes**.

---

## Getting Started

### 1. Install Dependencies
Run the following command in the project root directory:

```sh
npm install
```

### 2. Start the Development Server
Run the Next.js development server:

```sh
npm run dev
```

Then, open **[http://localhost:3000](http://localhost:3000)** in your browser to see the application in action.

---

## Project Overview

This application allows users to **load and interact with 3D models** using **Three.js**. It integrates with two backends:

### 1. FastAPI Backend
- Runs on `http://localhost:8000`
- Fetches model metadata

### 2. Next.js API Routes
- Local API endpoint at `/api/nextjs-model-info`
- Returns hardcoded model information

---

## API Endpoints

### 1. Python Backend (FastAPI)
- **Endpoint:** `GET /python-model-info`
- **Description:** Fetches model metadata from the FastAPI backend.
- **Example Response:**
  ```json
  {
      "model_name": "Capsule",
      "vertex_count": 824,
      "texture_details": "Simple JPG texture (capsule0.jpg)"
  }
  ```

### 2. Next.js API Route
- **Endpoint:** `GET /api/nextjs-model-info`
- **Description:** Fetches hardcoded model metadata from the Next.js API.
- **Example Response:**
  ```json
  {
      "model_name": "Cube",
      "vertex_count": 512,
      "texture_details": "Default texture applied"
  }
  ```

## Troubleshooting

### 1. Backend Not Responding?  
Ensure the FastAPI server is running:  
  ```sh
  uvicorn main:app --reload
  ```

### 2. CORS Issues?  
Update CORS settings in the FastAPI backend.

### 3. Model Not Loading?  
Check browser console logs for **missing assets** or **incorrect file paths**.

---
### Provided 3D Model Files

- **Material File:** [capsule.mtl](https://raw.githubusercontent.com/your-username/your-repo/main/path/to/capsule.mtl)
- **Texture File:** [capsule0.jpg](https://raw.githubusercontent.com/your-username/your-repo/main/path/to/capsule0.jpg)



## Learn More
- **[Next.js Documentation](https://nextjs.org/docs)** – Learn about Next.js features and API.
- **[Three.js Documentation](https://threejs.org/docs/)** – Explore 3D rendering capabilities.

---

🎉 **Happy coding!** 🚀

---

## FastAPI Backend for 3D Model Viewer

This is the **backend service** for the **3D Model Viewer application**, built with **FastAPI**. It serves model information and integrates with a **Next.js frontend**.

---

## Features
✅ **FastAPI-based REST API** for retrieving 3D model metadata.  
✅ **CORS enabled** to allow frontend communication.  
✅ **SQLite & Tortoise ORM** for database management.  
✅ **Uvicorn** server for asynchronous execution.  

---

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/your-repository/proto-3d-model.git
cd proto-3d-model/backend
```

### 2. Create a Virtual Environment
```sh
python -m venv venv
```

### 3. Activate the Virtual Environment
- **Windows:**
  ```sh
  venv\Scripts\activate
  ```
- **Mac/Linux:**
  ```sh
  source venv/bin/activate
  ```

### 4. Install Dependencies
```sh
pip install -r requirements.txt
```

---

## Running the Backend Server

To start the **FastAPI server**, run:
```sh
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
Once running, the backend will be accessible at:  
📌 **http://127.0.0.1:8000**

---

## API Endpoints

### 1. Get 3D Model Information
- **Endpoint:** `GET /python-model-info`
- **Description:** Returns metadata of the 3D model.
- **Response Example:**
  ```json
  {
      "model_name": "Capsule",
      "vertex_count": 824,
      "texture_details": "Simple JPG texture (capsule0.jpg)"
  }
  ```

---

## Project Structure
```
backend/
│-- main.py             # FastAPI application
│-- requirements.txt    # Project dependencies
│-- venv/               # Virtual environment (excluded in .gitignore)
│-- database.db         # SQLite database (if using SQLite)
```

---

## Environment Variables
You can create a `.env` file to store environment configurations.

### Example `.env` File
```
DATABASE_URL=sqlite:///./database.db
```

---

## Troubleshooting

### 1. `pip install -r requirements.txt` Fails?  
Make sure you are inside the **virtual environment**:
```sh
source venv/bin/activate  # (Mac/Linux)
venv\Scripts\activate  # (Windows)
```

### 2. `uvicorn` Not Found?  
Install **Uvicorn** manually:
```sh
pip install uvicorn
```

### 3. CORS Issues?  
Ensure `main.py` includes:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Contributing
Feel free to submit **pull requests** to improve this project! 🚀

---

## License
📜 This project is licensed under the **MIT License**.

---

Let me know if you need any further changes! 🚀

