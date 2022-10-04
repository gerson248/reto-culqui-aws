export const formatJSONResponse = (response: Record<string, unknown>, status: number) => {
  return {
    statusCode: status,
    body: JSON.stringify(response),
  };
};
