#backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="3D Model API", version="1.0.0")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ModelInfoResponse(BaseModel):
    model_name: str
    vertex_count: int
    texture_details: str

@app.get("/python-model-info", response_model=ModelInfoResponse)
async def get_model_info():
    """Get information about the 3D model"""
    return {
        "model_name": "Capsule",
        "vertex_count": 824,
        "texture_details": "Simple JPG texture (capsule0.jpg)"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)