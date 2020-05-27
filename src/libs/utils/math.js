const getRandomNumber = (maxNumber) => Math.floor(Math.random() * ((maxNumber - 1) - 0) + 0);


const getNextRoundRobin = (total, current) => (current === total - 1 ? 0 : current + 1);

export { getNextRoundRobin, getRandomNumber };
