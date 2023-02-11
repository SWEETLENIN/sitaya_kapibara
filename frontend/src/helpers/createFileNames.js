export const createFileName = (headers) => {
    const fileName = getFileNameFromHeaders(headers);
    return `${fileName.trim()}`;
}

export const createFilePatternName = (headers) => {
  const fileName = getFileNameFromHeaders(headers);
  return `shablon_${fileName.trim()}`;
}

const getFileNameFromHeaders = (headers) => {
  const disposition = headers.get("content-disposition");
  const fileNameUtf8WithPrefix = disposition ? disposition.split("=").pop() : "file.xlsx";
  const fileNameUtf8 = fileNameUtf8WithPrefix.split("''").pop();
  const fileNameWithQuotes = decodeURIComponent(fileNameUtf8);
  const fileName = fileNameWithQuotes.replace(/\"/g, " ");
  return fileName;
}
