const DEFAULT = 2;

const numberRound = (num, precision = DEFAULT) => (num ? Number(`${Math.round(`${num}e+${precision}`)}e-${precision}`) : num);

export default numberRound;
