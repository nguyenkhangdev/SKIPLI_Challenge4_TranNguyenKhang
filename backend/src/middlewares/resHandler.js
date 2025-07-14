import "dotenv/config";

export const responseHandler = (
  res,
  statusCode,
  message = "Response successful.",
  data = null,
  cookie = null
) => {
  const isProd = process.env.NODE_ENV === "production";

  if (cookie) {
    const cookieSameSite = isProd ? "none" : "lax";
    const cookieDomain = isProd ? process.env.RES_DOMAIN : "localhost";
    return res
      .status(statusCode)
      .cookie("user_token", cookie, {
        httpOnly: true,
        sameSite: cookieSameSite,
        secure: isProd,
        domain: cookieDomain,
        maxAge: 4 * 60 * 60 * 1000,
      })
      .json({ status: true, message, data });
  }
  return res.status(statusCode).json({ status: true, message, data });
};

export const errorHandler = (statusCode, message) => {
   const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  console.log(error);

  return error;
};

export const errorMiddleware = (err, req, res, next) => {
   const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    status: false,
    message: message,
    data: null,
  });
};
