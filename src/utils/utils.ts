export const mix = (array: Array<string>) => {
  let positionCurrent = array.length;

  while (0 !== positionCurrent) {
    const positionRandom = Math.floor(Math.random() * positionCurrent);
    positionCurrent--;
    [array[positionCurrent], array[positionRandom]] = [array[positionRandom], array[positionCurrent]];
  }
  return array;
};

export const generate = (amount: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
  mix(characters);
  return characters.slice(0, amount).join('');
};

export const existPKey = (pkey: string) => {
  return pkey.length == 0;
};

export const validatePKey = (pkey: string) => {
  const key = pkey.split(' ');
  // return key.length != 2 || !key[1].includes('pk_test_') || key[1].split('pk_test_')[1].length != 16;
  return key.length != 2 || !key[1].includes('pk_test_');
};
