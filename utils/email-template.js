module.exports.visitor = (message) => {
  return {
    subject: `Visit Alert - GadiForMe`,
    body: `Visit Alert GadiForMe, Type: ${message}`,
  };
};