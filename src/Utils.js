export const loginHandler = {
  isLoggedIn: localStorage.getItem("token") ? true : false,
  authenticated() {
    if (localStorage.getItem("token") !== null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    console.log('loggedin: ', this.isLoggedIn);

    return this.isLoggedIn;
  },
  signOut: () => {
    return "";
  }
}