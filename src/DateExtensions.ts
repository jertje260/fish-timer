import { DayOfWeek, Week } from "./Models/Weekday";

declare global {
    interface Date {
        GetDayOfWeek(): DayOfWeek
    }
}

Date.prototype.GetDayOfWeek = function (): DayOfWeek {
    return Week[this.getDay()];
  };