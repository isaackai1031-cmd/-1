from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from routers import products

app = FastAPI(title="Агуулахын систем")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

ERROR_CODES = {400: "BAD_REQUEST", 404: "NOT_FOUND", 409: "CONFLICT"}


@app.exception_handler(StarletteHTTPException)
async def http_error(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"code": ERROR_CODES.get(exc.status_code, "ERROR"), "message": str(exc.detail)},
    )


@app.exception_handler(RequestValidationError)
async def validation_error(request: Request, exc: RequestValidationError):
    details = [
        {"field": ".".join(str(part) for part in err["loc"][1:]), "message": err["msg"]}
        for err in exc.errors()
    ]
    return JSONResponse(
        status_code=422,
        content={"code": "VALIDATION", "message": "Оролтын утга буруу", "details": details},
    )


@app.get("/health")
def health():
    return {"status": "ok"}


app.include_router(products.router)
