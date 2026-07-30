from fastapi import Request, HTTPException


def require_login(request: Request):

    user = request.session.get("user")

    if user is None:

        raise HTTPException(
            status_code=401,
            detail="Please login with GitHub."
        )

    return user