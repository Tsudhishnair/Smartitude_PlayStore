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
};

export const EXPANSION_QUIZ_FORM = 1;
export const EXPANSION_FACULTY_FORM = 2;
export const EXPANSION_STUDENT_BATCH = 3;
export const EXPANSION_STUDENT_FORM = 4;
export const EXPANSION_DEPARTMENT_FORM = 5;
export const EXPANSION_FACULTY_BATCH = 6;
