export function calculoEstatisca(data) {
    const response = {
        totalReminders: data?.reminders.length,
        commumReminders: data?.reminders.filter((reminder) => {
            return reminder?.type == 'commum'
        }).length || 0,
        importantReminders: data?.reminders.filter((reminder) => {
            return reminder?.type == 'important'
        }).length || 0,
        totalObservations: data?.observations.length,
        avarageObservations: calcularMedia(data),
    }
    return response;
}

function calcularMedia(data) {
    let value = (data.observations).map((obs) => 
        obs.content.length
    );

    let reduced = value.reduce((total, item) => total + item, 0);
    let avarage = (reduced / value.length)
    return isNaN(avarage) ? 0 : avarage;
}