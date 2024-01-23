import { addDays, format, nextDay, startOfWeek } from "date-fns"

export const availableDay = (numberOfDayInAWeek: any) => {
    const currentDay = new Date()
    const startDayOfWeek = startOfWeek(currentDay)
    const customDay = addDays(startDayOfWeek, numberOfDayInAWeek)
    if (numberOfDayInAWeek < 0 || numberOfDayInAWeek > 6){
        throw "numberOfDayInAWeek must be between 0 and 6"
    }

    if (currentDay > customDay){
        return nextDay(customDay, numberOfDayInAWeek)
    }
    return customDay
}