export const retrieveRequestFile = async (
  req: Request,
  fileType: string,
): Promise<Response | File | undefined> => {
  const form = await req.formData();
  const file = form.get("file") as File;

  if (!file) {
    return new Response(
      "No file uploaded",
      { status: 400 },
    );
  }

  if (!file.type) {
    return new Response(
      "Invalid request file format",
      { status: 400 },
    );
  }

  if (file.type.indexOf(fileType) === -1) {
    return new Response(
      `Expected ${fileType} file type, found ${file.type}`,
      { status: 400 },
    );
  }

  const content = await file.text();
  if (content.trim() === "") {
    return new Response(
      "Cannot proceed empty file",
      { status: 400 },
    );
  }

  return file;
};
