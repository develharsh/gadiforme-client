import formidable from "formidable";

export default (req) => {
  return new Promise((resolve) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        resolve({ success: false, message: err });
      }
      resolve({ success: true, body: fields, files });
    });
  });
};
