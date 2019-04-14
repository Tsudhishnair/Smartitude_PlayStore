// used to handle client side session management
export const loginHandler = {
  isLoggedIn: localStorage.getItem("token") ? true : false,
  authenticated(userType) {
    if (localStorage.getItem("token") !== null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    this.userType = userType;

    localStorage.setItem("userType", userType);

    return this.isLoggedIn;
  },
  logout: () => {
    // remove token from storage
    localStorage.removeItem("token");
  },
  userType: localStorage.getItem("userType")
};

export const transformDateString = dateString => {
  const newDate = new Date(dateString);

  return `${newDate.getDate()}/${newDate.getMonth() +
    1}/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`;
};

export const EXPANSION_QUIZ_FORM = 1;
export const EXPANSION_FACULTY_FORM = 2;
export const EXPANSION_STUDENT_BATCH = 3;
export const EXPANSION_STUDENT_FORM = 4;
export const EXPANSION_DEPARTMENT_FORM = 5;
export const EXPANSION_FACULTY_BATCH = 6;
export const EXPANSION_CATEGORY_FORM = 7;
export const EXPANSION_SUBCATEGORY_FORM = 8;
