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
    localStorage.removeItem("admin");
    localStorage.removeItem("faculty");
    localStorage.removeItem("student");
  },
  userType: localStorage.getItem("userType")
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

export const padDigit = digit => {
  if (digit < 10) return `0${digit}`;
  else return digit;
};

export const isEquivalent = (a, b) => {
  // Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length != bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
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