from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse, JSONResponse

from app.auth.oauth import oauth

router = APIRouter()


@router.get("/login")
async def login(request: Request):

    redirect_uri = request.url_for("auth_callback")

    return await oauth.github.authorize_redirect(
        request,
        redirect_uri
    )


@router.get("/auth/callback", name="auth_callback")
async def auth_callback(request: Request):

    token = await oauth.github.authorize_access_token(request)

    user = await oauth.github.get(
        "user",
        token=token
    )

    user = user.json()

    request.session["user"] = user

    request.session["github_token"] = token["access_token"]

    return RedirectResponse(
        "http://localhost:5174/app.html"
    )


@router.get("/logout")
async def logout(request: Request):

    request.session.clear()

    return {
        "message": "Logged out successfully"
    }


@router.get("/me")
async def me(request: Request):

    user = request.session.get("user")

    if user is None:

        return JSONResponse(
            status_code=401,
            content={
                "authenticated": False
            }
        )

    return {
        "authenticated": True,
        "user": user
    }