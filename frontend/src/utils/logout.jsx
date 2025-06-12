const logout = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('userId');
  window.location.href = '/';
};

export default logout;
