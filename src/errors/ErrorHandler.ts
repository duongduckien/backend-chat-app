export function errorHandler(error: any, req: any, res: any, next: any): any {
  console.log('error', error);
  res.status(error.httpCode || 500);
  res.json({
    name: error.name,
    message: error.message,
    errors: error[`errors`] || [],
  });
}
