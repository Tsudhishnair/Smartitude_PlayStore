// used to handle client side session management
export const loginHandler = {
  isLoggedIn: localStorage.getItem("token") ? true : false,
  authenticated: userType => {
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
    localStorage.removeItem("admin");
    localStorage.removeItem("faculty");
    localStorage.removeItem("student");
  },
  userType: localStorage.getItem("userType")
};

export const getUserType = () => {
  return localStorage.getItem("userType");
};

export const transformDateString = dateString => {
  const newDate = new Date(dateString);

  return `${newDate.getDate()}/${newDate.getMonth() +
    1}/${newDate.getFullYear()} ${
    newDate.getHours() > 9 ? newDate.getHours() : "0" + newDate.getHours()
  }:${
    newDate.getMinutes() > 9 ? newDate.getMinutes() : "0" + newDate.getMinutes()
  }`;
};

//pad digits with a 0 in front of them
export const padDigit = digit => {
  if (digit < 10) return `0${digit}`;
  else return digit;
};

export const getTabStatus = () => {
  let hidden = null;
  let visibilityChange = null;
  if (typeof document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }
  return [hidden, visibilityChange];
};

export const EXPANSION_QUIZ_FORM = 1;
export const EXPANSION_FACULTY_FORM = 2;
export const EXPANSION_STUDENT_BATCH = 3;
export const EXPANSION_STUDENT_FORM = 4;
export const EXPANSION_DEPARTMENT_FORM = 5;
export const EXPANSION_FACULTY_BATCH = 6;
export const EXPANSION_CATEGORY_FORM = 7;
export const EXPANSION_SUBCATEGORY_FORM = 8;
export const EXPANSION_MESSAGE_FORM = 9;

export const ASSIGNED_QUIZ_CONSTANT = 1;
export const CUSTOM_QUIZ_CONSTANT = 2;
export const RANDOM_QUIZ_CONSTANT = 3;
