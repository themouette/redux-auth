import Auth from "j-toker";
import {
  authenticateStart,
  authenticateComplete,
  authenticateError
} from "./authenticate";

export function configure(config) {
  return dispatch => {
    dispatch(authenticateStart());

    // only allow authenticaton from client-evaluated code.
    if (window) {
      let jqPromise = Auth.configure(config);

      jqPromise.then(
        (user) => dispatch(authenticateComplete(user)),
        ({reason}) => dispatch(authenticateError([reason]))
      );

      return Promise.resolve(jqPromise);
    } else {
      let reason = "Must configure from browser.";
      dispatch(authenticateError([reason]));
      return Promise.reject(reason);
    }
  };
}
