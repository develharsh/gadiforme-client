module.exports.visitor = (message) => {
  return {
    subject: `Visit Alert - GadiForMe`,
    body: `Visit Alert GadiForMe, Type: ${message}`,
  };
};

module.exports.event = (message) => {
  return {
    subject: `Event Alert - GadiForMe`,
    body: `Event Alert GadiForMe, Type: ${message}`,
  };
};