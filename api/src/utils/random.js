randomString = (len = 12) => {
  string = '';
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  while (len > 0) {
    string += chars.charAt(Math.floor(Math.random() * chars.length));
    len--;
  }
  return string;
};

module.exports = {
  randomString,
};
