import Moment from "moment";

export const Overdue = (todo) => {
  return todo
    .filter((todo) => todo.completed === false)
    .filter((todo) => Moment(todo.date, "YYYYMMDD").fromNow().includes("day"));
};

export const NotDue = (todo) => {
  return todo
    .filter((todo) => todo.completed === false)
    .filter((todo) =>
      Moment(todo.date, "YYYYMMDD").fromNow().includes("hours")
    );
};
