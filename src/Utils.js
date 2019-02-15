// used to handle client side session management
export const loginHandler = {
  isLoggedIn: localStorage.getItem("token") ? true : false,
  authenticated() {
    if (localStorage.getItem("token") !== null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    return this.isLoggedIn;
  },
  signOut: () => {
    return "";
  }
}