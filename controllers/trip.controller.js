module.exports.add = async (req, res) => {
  console.log(req.body);
  res.status(201).json({ success: true, message: "Details Received" });
//   res.status(400).json({ success: false, message: "Phone is missing" });
};
