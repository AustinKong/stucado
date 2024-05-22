export type TimeOfDay =
  | 'dawn'
  | 'earlyAfternoon'
  | 'earlyMorning'
  | 'evening'
  | 'lateAfternoon'
  | 'lateMorning'
  | 'midnight'
  | 'night';

export const TimesOfDay: TimeOfDay[] = [
  'dawn',
  'earlyAfternoon',
  'earlyMorning',
  'evening',
  'lateAfternoon',
  'lateMorning',
  'midnight',
  'night',
];

export type Weather = 'sunny' | 'rainy' | 'stormy' | 'cloudy';

export const WeatherConditions: Weather[] = [
  'sunny',
  'rainy',
  'stormy',
  'cloudy',
];

export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export const WorkingDaysOfWeek: Day[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const DaysOfWeek: Day[] = [...WorkingDaysOfWeek, 'Sunday'];