import { DayOfWeek, Week } from "./Models/Weekday";
const millisecondsInADay = 86400000;

declare global {
    interface Date {
        GetDayOfWeek(): DayOfWeek;
        AddDays(days: number): Date;
    }
}

Date.prototype.GetDayOfWeek = function (): DayOfWeek {
    return Week[this.getDay()];
  };

  Date.prototype.AddDays = function(daysToAdd: number){
      return new Date(this.getTime() + daysToAdd * millisecondsInADay);
  }