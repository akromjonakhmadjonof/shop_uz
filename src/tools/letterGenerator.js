import crypto from 'crypto';

const letterGenerator = (size) => crypto.randomBytes(size).toString('hex');

export default letterGenerator;
