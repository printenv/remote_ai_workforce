import schedule from "node-schedule"

export const job = schedule.scheduleJob('30 1 * * *', () => {
    console.log("This job runs at 1:30 every day.")
})

