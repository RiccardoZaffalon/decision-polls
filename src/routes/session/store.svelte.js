let step = $state(1);

let participants = $state([]);
let choices = $state([]);

const configured = $derived(choices.length > 1 && participants.length > 1);

function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

function forward() {
    if (step < 3) {
        step += 1;
    }
}

function backward() {
    if (step > 0) {
        step -= 1;
    }
}

function goToStep(value = 1) {
    step = value;
}

function setParticipants(list = []) {
    participants = list;
}

function setChoices(list = []) {
    choices = list;
}

export default {
    get step() {
        return step;
    },
    get configured() {
        return configured;
    },
    get participants() {
        return participants;
    },
    get shuffledParticipantsIndices() {
        const indices = participants.map((_el, i) => i);
        shuffle(indices);

        return indices;
    },
    get choices() {
        return choices;
    },
    forward,
    backward,
    goToStep,
    setParticipants,
    setChoices,
};
