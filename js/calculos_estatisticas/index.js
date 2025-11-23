export function calculoEstatisca(data) {
    const reminders = data?.reminders;
    const response = {
        totalReminders: reminders.length,
        commumReminders: filterReminders(reminders, 'commum'),
        importantReminders: filterReminders(reminders, 'important'),
        totalObservations: data?.observations.length,
        avarageObservations: calcularMedia(data)
    };
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

function filterReminders (reminders, type) {
    let filtered = reminders.filter((item) => {
      return item.type == type;
    });

    return filtered.length || 0;
};